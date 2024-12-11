import cartModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { cartError } from '../helpers/constants.js';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import couponService from '../../coupons/services/couponService.js';

import productService from '../../products/services/productService.js';
import packageService from '../../package/services/packageService.js';
import orderService from '../../orders/services/orderService.js';
import { PAYMENT_STATUS, PAYMENT_METHODS } from '../../orders/helpers/constants.js';
import { productsErrors } from '../../products/helpers/constants.js';
import { packageErrors } from '../../package/helpers/constants.js';
import Fuse from 'fuse.js';
import axios from 'axios';
import emailService from '../../email/service/emailService.js';
import usersService from '../../users/services/usersService.js';
import { CLIENT_URL, EMAIL_CONFIG } from '../../../config/env/index.js';
import { EMAIL_TEMPLATES_DETAILS } from '../../email/helper/constant.js';


class CartService {
  async listCart(query = {}, userId) {
    const options = getPaginationAndSortingOptions(query);
    const { limit, page, sort, sortBy, search, minPrice, maxPrice, ..._query } = query;

    if (minPrice || maxPrice) {
      _query['price.finalPrice'] = {};
      if (minPrice) {
        _query['price.finalPrice'].$gte = minPrice;
      }
      if (maxPrice) {
        _query['price.finalPrice'].$lte = maxPrice;
      }
    }

    _query['userId'] = userId;
    let carts = await cartModel.find(_query, options, {});
    const count = await cartModel.countDocuments(_query);

    if (search) {
      const fuse = new Fuse(carts, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.3
      });
      carts = fuse.search(search).map(result => result.item);
    }

    return {
      carts,
      options: {
        ...options,
        count
      }
    };
  }

  async AddProductToCart(productId, quantity, userId) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);

        if (index > -1) {
          cart.products[index].quantity += quantity;
          cart.products[index].totalPrice =
            cart.products[index].quantity * product.product.price.finalPrice;
        } else {
          cart.products.push({
            productId,
            quantity,
            totalPrice: quantity * product.product.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart);
        await cartModel.update({ userId }, cart);
      } else {
        cart = await cartModel.create({
          userId,
          products: [
            { productId, quantity, totalPrice: quantity * product.product.price.finalPrice }
          ],
          totalPrice: quantity * product.product.price.finalPrice
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async AddPackageToCart(packageId, userId, quantity) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });


      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);

        if (index > -1) {
          cart.packages[index].quantity += quantity;
          cart.packages[index].totalPrice =
            cart.packages[index].quantity * Package.Package.price.finalPrice;
        } else {

          cart.packages.push({
            packageId,
            quantity,
            totalPrice: quantity * Package.Package.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart);
        await cartModel.update({ userId }, cart);
      } else {

        cart = await cartModel.create({
          userId,
          packages: [
            { packageId, quantity, totalPrice: quantity * Package.Package.price.finalPrice }
          ],
          totalPrice: quantity * Package.Package.price.finalPrice
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increaseProductQuantity(productId, userId) {
    return this.AddProductToCart(productId, 1, userId);
  }

  async decreaseProductQuantity(productId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index === -1 || cart.products[index].quantity <= 1) {
        throw new ErrorResponse(
          productsErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          productsErrors.INVALID_QUANTITY.code
        );
      }

      cart.products[index].quantity -= 1;
      cart.products[index].totalPrice =
        cart.products[index].quantity * ((await productService.getProduct(productId)).product.price.finalPrice)
      cart.totalPrice = this.calculateTotalPrice(cart);
      await cartModel.update({ userId }, cart);

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removeProductFromCart(productId, userId) {
    try {
      const isProductIdValid = await productService.getProduct(productId);
      if (!isProductIdValid) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index > -1) {
        cart.products.splice(index, 1);
        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cartModel.update({ userId }, cart)
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removePackageFromCart(packageId, userId) {
    try {

      const isPackageIdValid = await packageService.getPackage(packageId);
      if (!isPackageIdValid) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index > -1) {
        cart.packages.splice(index, 1);
        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cartModel.update({ userId }, cart);
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProductInCart(productId, userId, newQuantity, newPrice) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);
        if (index > -1) {
          if (newQuantity) {
            cart.products[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.products[index].totalPrice = cart.products[index].quantity * newPrice;
          } else {
            cart.products[index].totalPrice =
              cart.products[index].quantity * product.product.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            productsErrors.PRODUCT_NOT_FOUND.message,
            BAD_REQUEST,
            productsErrors.PRODUCT_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatePackageInCart(packageId, userId, newQuantity, newPrice) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);
        if (index > -1) {
          if (newQuantity) {
            cart.packages[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.packages[index].totalPrice = cart.packages[index].quantity * newPrice;
          } else {
            cart.packages[index].totalPrice =
              cart.packages[index].quantity * Package.Package.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            packageErrors.PACKAGE_NOT_FOUND.message,
            BAD_REQUEST,
            packageErrors.PACKAGE_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async decreasePackageQuantity(packageId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index === -1 || cart.packages[index].quantity <= 1) {
        throw new ErrorResponse(
          packageErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          packageErrors.INVALID_QUANTITY.code
        );
      }

      cart.packages[index].quantity -= 1;
      cart.packages[index].totalPrice =
        cart.packages[index].quantity *
        (await packageService.getPackage(packageId)).price.finalPrice;
      cart.totalPrice = this.calculateTotalPrice(cart);
      await cartModel.update({ userId }, cart);

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increasePackageQuantity(packageId, userId) {
    return this.AddPackageToCart(packageId, userId, 1);
  }

  calculateTotalPrice = cart => {
    let total = 0;
    cart.products.forEach(product => {
      total += product.totalPrice;
    });
    cart.packages.forEach(pkg => {
      total += pkg.totalPrice;
    });
    return total;
  };

  async applyCoupon(code, userId) {
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      throw new ErrorResponse(
        cartError.CART_NOT_FOUND.message,
        BAD_REQUEST,
        cartError.CART_NOT_FOUND.code
      );
    }

    const coupon = await couponService.getCoupon(code);

    if (!coupon) {
      throw new ErrorResponse(
        cartError.COUPON_NOT_FOUND.message,
        BAD_REQUEST,
        cartError.COUPON_NOT_FOUND.code
      );
    }

    const discount = await couponService.applyCoupon(code, cart, userId);
    cart.totalPrice -= discount;
    await cartModel.update({ userId }, cart);
  }










  async checkOut(userId, body) {
    // Retrieve the user's cart
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      throw new ErrorResponse(
        cartError.CART_NOT_FOUND.message,
        BAD_REQUEST,
        cartError.CART_NOT_FOUND.code
      );
    }



    let paymentStatus =
      body['paymentMethod'] === PAYMENT_METHODS['COD']
        ? PAYMENT_STATUS['NOT_PAID']
        : body['paymentMethod'] === PAYMENT_METHODS['INSTANT']
          ? PAYMENT_STATUS['SUCCESS']
          : PAYMENT_STATUS['PENDING'];

    body.paymentStatus = paymentStatus;

    // Prepare the order data
    const userEmail = (await usersService.getUser(userId)).email;
    const order = {
      user: userId,
      cart: {
        products: cart.products,
        packages: cart.packages,
        totalPrice: cart.totalPrice
      },
      ...body
    };



    const createdOrder = await orderService.createOrder(order);
    await orderService.sendOrderEmail(EMAIL_CONFIG.emailUser, createdOrder._id)


    const orderId = createdOrder.id;
    const orderLink = `${CLIENT_URL}/profile?tab=orders&orderId=${orderId}`;

    const orderDetails = await Promise.all(
      [...cart.products, ...cart.packages].map(async (item) => {

        const itemName = item.productId ? (await productService.getProduct(item.productId)).product.name : (await packageService.getPackage(item.packageId)).Package.name;
        const productPrice = item.productId ? (await productService.getProduct(item.productId)).product.price.finalPrice : (await packageService.getPackage(item.packageId)).Package.price.finalPrice;

        return {
          name: itemName,
          quantity: item.quantity,
          price: productPrice,
          total: item.totalPrice,
        };
      })
    );



    await emailService.sendEmail([userEmail], EMAIL_TEMPLATES_DETAILS['CREATE_ORDER'], {
      username: (await usersService.getUser(userId)).name,
      orderId,
      orderLink,
      orderDetails,
      totalPrice: cart.totalPrice
    });




    await cartModel.delete({ userId });

    return createdOrder;
  }









}

export default new CartService();
