import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import servicesService from '../services/index.js';
import logger from '../../../common/utils/logger/index.js';

const { OK } = StatusCodes;

export default {
  [CONTROLLERS.LIST_SERVICES]: async (req, res, next) => {
    try {
      const data = await servicesService.listServices(req.user, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.LIST_SERVICE_BY_CLIENT]: async (req, res, next) => {
    try {
      const data = await servicesService.listServicesForClient(
        req.user,
        req.query.maintenanceCenterId,
        req.query
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_SERVICE]: async (req, res, next) => {
    try {
      const data = await servicesService.getService(req.user, req.params.serviceId);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_SERVICE_BY_CLIENT]: async (req, res, next) => {
    try {
      const data = await servicesService.getServiceByClient(
        req.user,
        req.query.maintenanceCenterId,
        req.params.serviceId
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_SERVICE]: async (req, res, next) => {
    try {
      const data = await servicesService.createService(req.user, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_SERVICE]: async (req, res, next) => {
    try {
      const user = req.user;
      const serviceId = req.params.serviceId;
      const data = await servicesService.updateService(user, serviceId, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_SERVICES]: async (req, res, next) => {
    try {
      await servicesService.deleteService(req.user, req.params.serviceId);
      return res.status(OK).json({
        success: true
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
