import couponsService from '../services/couponService.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_COUPONS]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await couponsService.listCoupons(req.query, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_COUPON]: async (req, res, next) => {
    try {
      const data = await couponsService.getCoupon(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_COUPON]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await couponsService.createCoupon(req.body, user);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_COUPON]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await couponsService.updateCoupon(req.params.id, req.bod, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_COUPON]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await couponsService.deleteCoupon(req.params.id, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.COUNT_COUPONS]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await couponsService.countCoupons(req.query, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
