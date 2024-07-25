import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import notificationService from '../services/notificationsService.js';
import logger from '../../../common/utils/logger/index.js'

const { OK } = StatusCodes;

export default {
  [CONTROLLERS.LIST_NOTIFICATIONS]: async (req, res, next) => {
    try {

      const userId = _.get(req, 'user._id', null)
      const data = await notificationService.listNotifications(userId, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_NOTIFICATION]: async (req, res, next) => {
    try {
      const data = await notificationService.getNotification(req.params.id);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_NOTIFICATIONS]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null)
      const data = await notificationService.countNotifications(userId, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_NOTIFICATION]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);

      const data = await notificationService.createNotification(userId, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CLEAR_NOTIFICATIONS]: async (req, res, next) => {
    try {

      const userId = _.get(req, 'user._id', null)
      const data = await notificationService.clearNotifications(userId, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    }catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DELETE_NOTIFICATION]: async (req, res, next) => {
    try {
      const data = await notificationService.deleteNotification(req.params.id);
      return res.status(OK).json({
        success: true,
        data
      });
    }catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
