import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import reviewsService from '../services/reviewsService.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLERS.LIST_REVIEWS]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const user = _.get(req, 'user', null);
      const data = await reviewsService.listReviews(user, userRole, req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_REVIEWS]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const user = _.get(req, 'user', null);
      const data = await reviewsService.countReviews(user, userRole, req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_REVIEW]: async (req, res, next) => {
    try {
      const data = await reviewsService.getReview(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_REVIEW]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await reviewsService.createReview(userId, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_REVIEW]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await reviewsService.updateReview(userId, req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DELETE_REVIEW]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const userRole = _.get(req, 'user.role', null);
      const data = await reviewsService.deleteReview(userId, userRole, req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};
