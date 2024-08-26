import serviceTypesServices from '../services/serviceTypesServices.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {

  [CONTROLLERS.LIST_SERVICES_TYPES]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const data = await serviceTypesServices.listServicesTypes(userRole, req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const data = await serviceTypesServices.getServiceType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await serviceTypesServices.createServiceType(userId, req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const data = await serviceTypesServices.updateServiceType(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const data = await serviceTypesServices.deleteServiceType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.APPROVE_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await serviceTypesServices.approveServiceType(userId, req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DECLINE_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await serviceTypesServices.declineServiceType(userId, req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.REQUEST_SERVICE_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id');
      const data = await serviceTypesServices.requestServiceType(userId, req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_SERVICE_TYPES]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const data = await serviceTypesServices.countServiceTypes(userRole, req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
