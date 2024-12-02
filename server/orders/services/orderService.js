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
      return { orders, options };
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


}
  

export default new OrderService();
