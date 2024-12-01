import Coupon from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import usersService from '../../users/services/usersService.js';

import moment from 'moment';

import { COUPON_STATUS, couponsErrors , COUPON_TYPES } from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

class CouponService {
  async listCoupons(query) {
    const { limit, skip, sort, page , ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const coupons = await Coupon.find(_query, options);
      return { coupons, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCoupon(code) {
    try {
      const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            throw new ErrorResponse(
            couponsErrors.COUPON_NOT_FOUND.message,
            BAD_REQUEST,
            couponsErrors.COUPON_NOT_FOUND.code
            );
        }

        if(moment(coupon.expiryDate).isBefore(moment())) {
            throw new ErrorResponse(
            couponsErrors.INVALID_COUPON_EXPIRY_DATE.message,
            BAD_REQUEST,
            couponsErrors.INVALID_COUPON_EXPIRY_DATE.code,
            );
        }

      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createCoupon(body) {
    try {
        const isCouponExists = await Coupon.findOne({ code: body.code });

        if (isCouponExists) {
          if (moment(isCouponExists.expiryDate).isAfter(moment())) {
            throw new ErrorResponse(
              couponsErrors.COUPON_ALREADY_EXIST_AND_NOT_EXPIRED.message,
              BAD_REQUEST,
            couponsErrors.COUPON_ALREADY_EXIST_AND_NOT_EXPIRED.code
            );
          }
        }     
        
        if (!moment(body.expiryDate).isValid() || moment(body.expiryDate).isBefore(moment())) {
        throw new ErrorResponse(
          couponsErrors.INVALID_COUPON_EXPIRY_DATE.message,
          BAD_REQUEST,
          couponsErrors.INVALID_COUPON_EXPIRY_DATE.code
        );
      }

      const coupon = await Coupon.create(body);
      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateCoupon(id, body) {
    try {
        const isCouponExist = await Coupon.findOne({ _id: id });
        if (!isCouponExist) {
            throw new ErrorResponse(
            couponsErrors.COUPON_NOT_FOUND.message,
            BAD_REQUEST,
            couponsErrors.COUPON_NOT_FOUND.code
            );
        }

      if (body.expiryDate) {
        if (!moment(body.expiryDate).isValid() || moment(body.expiryDate).isBefore(moment())) {
          throw new ErrorResponse(
            couponsErrors.INVALID_COUPON_EXPIRY_DATE.message,
            BAD_REQUEST,
            couponsErrors.INVALID_COUPON_EXPIRY_DATE.code
          );
        }
      }
      const coupon = await Coupon.update({ _id: id }, body, { new: true });

      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteCoupon(id) {
    try {
      const isCouponExist = await Coupon.findOne({ _id: id });
        if (!isCouponExist) {
            throw new ErrorResponse(
            couponsErrors.COUPON_NOT_FOUND.message,
            BAD_REQUEST,
            couponsErrors.COUPON_NOT_FOUND.code
            );
        }
      const coupon = await Coupon.delete({ _id: id });
      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async applyCoupon(code , cart , userId) {
    try {
      const user = await usersService.getUser(userId);

      const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            throw new ErrorResponse(
            couponsErrors.COUPON_NOT_FOUND.message,
            BAD_REQUEST,
            couponsErrors.COUPON_NOT_FOUND.code
            );
        }

        if(user.AppliedCoupons.includes(coupon.code)) {

            throw new ErrorResponse(
            couponsErrors.COUPON_ALREADY_APPLIED.message,
            BAD_REQUEST,
            couponsErrors.COUPON_ALREADY_APPLIED.code
            );

        }


        if (moment(coupon.expiryDate).isBefore(moment())) {
            throw new ErrorResponse(
            couponsErrors.COUPON_NOT_FOUND.message,
            BAD_REQUEST,
            couponsErrors.COUPON_NOT_FOUND.code
            );
        }
        if (coupon.status !== COUPON_STATUS.ACTIVE) {
            throw new ErrorResponse(
            couponsErrors.INVALID_COUPON_STATUS.message,
            BAD_REQUEST,
            couponsErrors.INVALID_COUPON_STATUS.code
            );
        }
        if (coupon.code !== code) {
            throw new ErrorResponse(
            couponsErrors.INVALID_COUPON_CODE.message,
            BAD_REQUEST,
            couponsErrors.INVALID_COUPON_CODE.code
            );
        }

        let discount = 0;
        if (coupon.discount.type === COUPON_TYPES.PERCENTAGE) {
            discount = (coupon.discount.value / 100) * cart.totalPrice;
        } else {
            discount = coupon.discount.value;
        }
        user.AppliedCoupons.push(coupon.code);
        await usersService.updateUser(userId, user);
        return discount;
    }
    catch (e) {
      logger.error(e);
      throw e;
    }

}

}

export default new CouponService();
