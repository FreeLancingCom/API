import OrderModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { ordersErrors, PAYMENT_METHODS, ORDER_STATUS, PAYMENT_STATUS } from '../helpers/constants.js';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

import { USER_ROLES } from '../../../common/helpers/constants.js';
import emailService from '../../email/service/emailService.js';
import { EMAIL_TEMPLATES_DETAILS } from '../../email/helper/constant.js';
import usersService from '../../users/services/usersService.js';
import productService from '../../products/services/productService.js';
import packageService from '../../package/services/packageService.js';

class OrderService {
  async listOrders(query, user) {
    const userRole = _.get(user, 'role', null);
    const { limit, skip, sort,  page ,  ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    
    try {
      if (userRole === USER_ROLES.CLIENT) {
        _query.user = user._id;
      }
      const orders = await OrderModel.find(_query, options);
      const count = await OrderModel.countDocuments(_query); 
      return { orders, options:{...options,count} };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getOrder(orderId, user) {
    try {
      const userRole = _.get(user, 'role', null);
      const filter =
        userRole === USER_ROLES.CLIENT ? { _id: orderId, user: user._id } : { _id: orderId };
      const order = await OrderModel.findOne(filter);
      if (!order) {
        throw new ErrorResponse(
          ordersErrors.ORDER_NOT_FOUND.message,
          BAD_REQUEST,
          ordersErrors.ORDER_NOT_FOUND.code
        );
      }
      return order;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createOrder(body) {
    try {
      const order = await OrderModel.create(body);
      console.log("order", order);
      return order;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async updateOrder(orderId, body) {
    try {


      if(body['status'] === ORDER_STATUS['NOT_PAID']){
        body['paymentStatus'] = PAYMENT_STATUS['NOT_PAID'];
      }
      else if(body['status'] === ORDER_STATUS['DELIVERED']){
        body['paymentStatus'] = PAYMENT_STATUS['SUCCESS'];
      }
      else if(body['status'] === ORDER_STATUS['CANCELLED']){
        body['paymentStatus'] = PAYMENT_STATUS['REFUNDED'];
      }
      console.log(body);
      const order = await OrderModel.update(
        { _id: orderId },
        { ...body },
        { new: true }
      )
  
    
      return order;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  

  async deleteOrder(orderId) {
    try {
      const order = await OrderModel.delete({ _id: orderId });
      if (!order) {
        throw new ErrorResponse(
          ordersErrors.ORDER_NOT_FOUND.message,
          BAD_REQUEST,
          ordersErrors.ORDER_NOT_FOUND.code
        );
      }
      return order;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async refundOrder(id) {
    try {
      const order = await OrderModel.findOne({ _id: id });
      if (!order) {
        throw new ErrorResponse(
          ordersErrors.ORDER_NOT_FOUND.message,
          BAD_REQUEST,
          ordersErrors.ORDER_NOT_FOUND.code
        );
      }

  
      if (order.paymentMethod === PAYMENT_METHODS.COD && order.status === ORDER_STATUS.PENDING) {
        await OrderModel.update({ _id: id }, { status: ORDER_STATUS.CANCELLED });
        return `Order ${id} has been cancelled successfully`;
      }
  
      if (order.status === ORDER_STATUS.PENDING && order.paymentMethod != PAYMENT_METHODS.COD) {
        // const paymentId = order.paymentId;
        // const amountToSmallestCurrency = Math.round(order.totalPrice * 100);
        
        // const refundResponse = await axios.post(
        //   `https://api.moyasar.com/v1/payments/${paymentId}/refund`,
        //   { amount: amountToSmallestCurrency },
        //   {
        //     headers: {
        //       Authorization: `Basic ${Buffer.from(process.env.MOYASAR_API_KEY + ':').toString('base64')}`
        //     }
        //   }
        // );
  
        // if (refundResponse.status === 200) {
        //   console.log(`sucess${refundResponse}`); 
        //   await OrderModel.update({ _id: id }, { status: ORDER_STATUS.CANCELLED } , {paymentStatus : PAYMENT_STATUS.REFUNDED});
        //   return `Order ${id} has been refunded successfully`;
        // } else {
        //   throw new ErrorResponse(
        //     ordersErrors.ORDER_REFUND_FAILED.message,
        //     BAD_REQUEST,
        //     ordersErrors.ORDER_REFUND_FAILED.code
        //   );
        // }
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async sendOrderEmail(email, orderId) {
    console.log('Sending email to:', email, 'with orderId:', orderId); // Log for debugging
    try {
        const order = await OrderModel.findOne({ _id: orderId });
        if (!order) {
            throw new ErrorResponse(
                ordersErrors.ORDER_NOT_FOUND.message,
                BAD_REQUEST,
                ordersErrors.ORDER_NOT_FOUND.code
            );
        }
        const cart = order.cart;


        const orderDetails = await Promise.all(
          [...cart.products, ...cart.packages].map(async (item) => {
        
            const itemName = item.productId ? (await productService.getProduct(item.productId)).product.name : (await packageService.getPackage(item.packageId)).Package.name;
            const productPrice = item.productId ? (await productService.getProduct(item.productId)).product.price.finalPrice : (await packageService.getPackage(item.packageId)).Package.price.finalPrice;
            const intemQuantity = item.productId ? (await productService.getProduct(item.productId)).product.quantity : (await packageService.getPackage(item.packageId)).Package.quantity;
            
            return {
              name: itemName,
              quantity:intemQuantity ,
              price: productPrice,
              total: item.totalPrice,
            };
          })
        );

        let manger = {...orderDetails};

        console.log(orderDetails);

        // Build the data object
        let Data = {};
        Data.username = (await usersService.getUser(order.user)).name;
        Data.phoneNumber = (await usersService.getUser(order.user)).phoneNumber;
        Data.addressFirstLine = order.address.firstLine;
        Data.street = order.address.street; 
        Data.city = order.address.city;
        Data.googleLocation = order.address.googleLocation;
        Data.postalCode = order.address.postalCode;
        Data.country = order.address.country;
        Data.totalPrice = order.cart.totalPrice;
        Data.paymentMethod = order.paymentMethod;
        Data.paymentStatus = order.paymentStatus;
        Data.orderId = orderId;

        let currentDate = new Date();
        const customFormattedDate = currentDate.getFullYear() + '-' 
            + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' 
            + currentDate.getDate().toString().padStart(2, '0') + ' ' 
            + currentDate.getHours().toString().padStart(2, '0') + ':' 
            + currentDate.getMinutes().toString().padStart(2, '0') + ':' 
            + currentDate.getSeconds().toString().padStart(2, '0');

        Data.requestReceived = customFormattedDate;
        Data.status = order.status;
        Data.orderDetails = orderDetails;


        console.log();
        // Log the data being passed to the template
        console.log('Sending email with data:', Data);

        await emailService.sendEmail([email], EMAIL_TEMPLATES_DETAILS['DELIVERY_CREATE_ORDER'], Data);

    } catch (error) {
        console.error('Error sending email:', error);
    }
}



}
  

export default new OrderService();
