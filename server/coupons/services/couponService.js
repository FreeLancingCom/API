import couponsModel from '../model/index.js';
import maintenanceCenterModel from '../../maintenanceCenter/models/index.js';
import { maintenanceCentersErrors } from '../../maintenanceCenter/helpers/constants.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { couponError } from '../helpers/constants.js';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

import moment from 'moment';
import { USER_ROLES } from '../../../common/helpers/constants.js';

class CouponsService {
  async listCoupons(query, user) {
    const userId = _.get(user, 'id', null);
    const role = _.get(user, 'role', null);
    const { limit, skip, sort, ..._query } = query;

    try {
      const options = getPaginationAndSortingOptions(query);

      if (role === USER_ROLES.PROVIDER) {
        _query.maintenanceCenterId = user.maintenanceCenterId;
      }

      const coupons = await couponsModel.find(_query, options);
      const count = await couponsModel.count(_query);

      return { coupons, count };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCoupon(couponId) {
    try {
      const coupon = await couponsModel.findOne({ _id: couponId });
      if (!coupon) {
        throw new ErrorResponse(
          couponError.COUPON_NOT_FOUND.message,
          BAD_REQUEST,
          couponError.COUPON_NOT_FOUND.code
        );
      }
      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createCoupon(body, user) {
    try {
      const isValidMaintenanceCenter = await maintenanceCenterModel.findOne({
        _id: user.maintenanceCenterId
      });

      if (!isValidMaintenanceCenter) {
        throw new ErrorResponse(
          maintenanceCentersErrors.MAINTENANCE_CENTER_NOT_FOUND.message,
          BAD_REQUEST,
          maintenanceCentersErrors.MAINTENANCE_CENTER_NOT_FOUND.code
        );
      }

      const dueDate = moment(body.dueDate, moment.ISO_8601, true);

      if (!dueDate.isValid() || dueDate.isBefore(moment())) {
        throw new ErrorResponse(
          couponError.INVALID_DUE_DATE.message,
          BAD_REQUEST,
          couponError.INVALID_DUE_DATE.code
        );
      }
      const createdCoupon = await couponsModel.create(body);
      return createdCoupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateCoupon(couponId, body, user) {
    try {
      const isExistCoupon = await couponsModel.findOne({
        _id: couponId,
        maintenanceCenterId: user.id
      });

      if (!isExistCoupon) {
        throw new ErrorResponse(
          couponError.COUPON_NOT_FOUND.message,
          BAD_REQUEST,
          couponError.COUPON_NOT_FOUND.code
        );
      }
      if (body.dueDate) {
        const dueDate = moment(body.dueDate, 'YYYY-MM-DD', true);

        if (!dueDate.isValid() || dueDate.isBefore(moment())) {
          throw new ErrorResponse(
            couponError.INVALID_DUE_DATE.message,
            BAD_REQUEST,
            couponError.INVALID_DUE_DATE.code
          );
        }
        body.dueDate = dueDate.toDate();
      }

      const updatedCoupon = await couponsModel.update({ _id: couponId }, body);
      return updatedCoupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteCoupon(couponId, user) {
    try {
      const isExistCoupon = await couponsModel.findOne({
        _id: couponId,
        maintenanceCenterId: user.id
      });

      if (!isExistCoupon) {
        throw new ErrorResponse(
          couponError.COUPON_NOT_FOUND.message,
          BAD_REQUEST,
          couponError.COUPON_NOT_FOUND.code
        );
      }
      const deletedCoupon = await couponsModel.delete({ _id: couponId });
      return deletedCoupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countCoupons(query, user) {
    try {
      if (user.role === USER_ROLES.PROVIDER) {
        query.maintenanceCenterId = user.maintenanceCenterId;
      }
      const count = await couponsModel.count(query);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async validateCoupon(code) {
    try {
      const coupon = await couponsModel.findOne({ _id: code });
      if (!coupon) {
        throw new ErrorResponse(
          couponError.COUPON_NOT_FOUND.message,
          BAD_REQUEST,
          couponError.COUPON_NOT_FOUND.code
        );
      }
      if (coupon.dueDate && moment(coupon.dueDate).isBefore(moment())) {
        throw new ErrorResponse(
          couponError.COUPON_EXPIRED.message,
          BAD_REQUEST,
          couponError.COUPON_EXPIRED.code
        );
      }
      return coupon;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new CouponsService();