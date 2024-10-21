import CouponService from '../services/couponService.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_COUPONS]: async (req, res, next) => {
    try {
      const data = await CouponService.listCoupons(req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_COUPON]: async (req, res, next) => {
    try {
      const data = await CouponService.getCoupon(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_COUPON]: async (req, res, next) => {
    try {
      const data = await CouponService.createCoupon(req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_COUPON]: async (req, res, next) => {
    try {
      const data = await CouponService.updateCoupon(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_COUPON]: async (req, res, next) => {
    try {
      const data = await CouponService.deleteCoupon(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },


};
