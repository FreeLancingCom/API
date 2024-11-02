import orderService from '../services/orderService.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_ORDERS]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await orderService.listOrders(req.query, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_ORDER]: async (req, res, next) => {
    try {
      const user = _.get(req, 'user', null);
      const data = await orderService.getOrder(req.params.id, user);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_ORDER]: async (req, res, next) => {
    try {
      const data = await orderService.createOrder(req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_ORDER]: async (req, res, next) => {
    try {
      const data = await orderService.updateOrder(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_ORDER]: async (req, res, next) => {
    try {
      const data = await orderService.deleteOrder(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.REFUND_ORDER]: async (req, res, next) => {
    try {
      const data = await orderService.refundOrder(req.body.orderId);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
