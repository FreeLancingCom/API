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
      let filters = {};
      let coupons = [];
      let total = null;

      if (role === USER_ROLES.ADMIN) {
        filters = _query;
        total = await this.countCoupons(filters);
      } else if (role === USER_ROLES.PROVIDER) {
        filters = { ..._query, maintenanceCenterId: userId };
        total = await this.countCoupons(filters);
      } else {
        filters = { ..._query, maintenanceCenterId: userId };
      }

      coupons = await couponsModel.find(filters, options);

      if (total !== null) {
        return { coupons, total };
      }

      return { coupons };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  //?here I am doing filter object which using the logic I put is
  //1) if user is admin then he can see all coupons
  //2) if user is provider then he can see only his coupons
  //3) if the user is admin can see the count of all coupons
  //4) if the user is provider can see the count of his coupons

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

  async createCoupon(body) {
    try {
      const isValidMaintenanceCenter = await maintenanceCenterModel.findOne({
        _id: body.maintenanceCenterId
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

  async updateCoupon(couponId, body) {
    try {
      const isExistCoupon = await couponsModel.findOne({ _id: couponId });

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

  async deleteCoupon(couponId) {
    try {
      const isExistCoupon = await couponsModel.findOne({ _id: couponId });

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

  async countCoupons(query) {
    try {
      const count = await couponsModel.count(query);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async applyCoupon(code) {
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
