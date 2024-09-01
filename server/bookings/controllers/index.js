import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import bookingsService from '../services/bookingService.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLERS.CLIENT_LIST_BOOKINGS]: async (req, res, next) => {
    try {
      const data = await bookingsService.clientListBookings(req.user,req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.Provider_LIST_BOOKINGS]: async (req, res, next) => {
    try {
      const data = await bookingsService.providerListBookings(req.user,req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.ADMIN_LIST_BOOKINGS]: async (req, res, next) => {
    try {
      const data = await bookingsService.adminListBookings(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_BOOKINGS]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id');
      const userRole = _.get(req, 'user.role', null);
      const data = await bookingsService.countBookings(userRole,userId,req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.getBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.clientCreateBooking(req.user, req.body);
      delete data.token
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.updatBooking(req.user,req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.RESCHEDULE_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.rescheduleBooking(req.user,req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.APPROVE_CLIENT_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.approveClientBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.APPROVE_PROVIDER_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.approveProviderBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DECLINE_CLIENT_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.declineClientBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DECLINE_PROVIDER_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.declineProviderBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COMPLETE_BOOKING]: async (req, res, next) => {
    try {
      const data = await bookingsService.completeBooking(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
