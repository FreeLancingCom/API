import OrderModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { ordersErrors } from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

import { USER_ROLES } from '../../../common/helpers/constants.js';

class OrderService {

  async listOrders(query, user) {
    const userRole = _.get(user, 'role', null);
    const { limit, skip, sort, ..._query } = query;
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

  async getOrder(orderId , user) {
    try {
      const userRole = _.get(user, 'role', null);
      const filter = userRole === USER_ROLES.CLIENT ? { _id: orderId, user: user._id } : { _id: orderId };
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
      const order = await OrderModel.update({ _id: orderId }, body, {
        new: true
      });
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
}

export default new OrderService();
