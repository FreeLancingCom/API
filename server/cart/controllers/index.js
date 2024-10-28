import cartService from '../services/cartService.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {
  // List cart items
  [CONTROLLERS.LIST_CART]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.listCart(req.query, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
 
  // Add product to the cart
  [CONTROLLERS.CREATE_CART_PRODUCT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const { quantity } = req.body;
      const data = await cartService.AddProductToCart(req.params.id, quantity, userId);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Remove product from the cart
  [CONTROLLERS.DELETE_CART_PRODUCT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.removeProductFromCart(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Update product in the cart (quantity or price)
  [CONTROLLERS.UPDATE_CART_PRODUCT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const { quantity, price } = req.body; 
      const data = await cartService.updateProductInCart(req.params.id, userId, quantity, price);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  // Update package in the cart (quantity or price)
  [CONTROLLERS.UPDATE_CART_PACKAGE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const { quantity, price } = req.body; 
      const data = await cartService.updatePackageInCart(req.params.id, userId, quantity, price);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Add package to the cart
  [CONTROLLERS.CREATE_CART_PACKAGE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const { quantity } = req.body;
      const data = await cartService.AddPackageToCart(req.params.id, userId, quantity);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Remove package from the cart
  [CONTROLLERS.DELETE_CART_PACKAGE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.removePackageFromCart(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  

  // Increase the quantity of a product in the cart
  [CONTROLLERS.INCREASE_PRODUCT_QUANTITY]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.increaseProductQuantity(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Decrease the quantity of a product in the cart
  [CONTROLLERS.DECREASE_PRODUCT_QUANTITY]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.decreaseProductQuantity(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Increase the quantity of a package in the cart
  [CONTROLLERS.INCREASE_PACKAGE_QUANTITY]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.increasePackageQuantity(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // Decrease the quantity of a package in the cart
  [CONTROLLERS.DECREASE_PACKAGE_QUANTITY]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.decreasePackageQuantity(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.APPLY_COUPON]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.applyCoupon(req.body.code, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CHECK_OUT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.checkOut(userId, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.REMOVE_PRODUCT_FROM_CART]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await cartService.removeProductFromCart(req.params.id, userId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
