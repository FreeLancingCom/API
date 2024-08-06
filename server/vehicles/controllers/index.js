import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import vehiclesService from '../services/vehicleService.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLERS.LIST_CLIENT_VEHICLES]: async (req, res, next) => {
    try {
      const data = await vehiclesService.listVehicles(req.user,req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.ADMIN_LIST_VEHICLES]: async (req, res, next) => {
    try {
      const data = await vehiclesService.adminListVehicles(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_VEHICLES]: async (req, res, next) => {
    try {
      const data = await vehiclesService.countVehicles(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_VEHICLE]: async (req, res, next) => {
    try {
      const data = await vehiclesService.getVehicle(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_VEHICLE]: async (req, res, next) => {
    try {
      const data = await vehiclesService.createVehicle(req.user, req.body);
      delete data.token
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_VEHICLE]: async (req, res, next) => {
    try {
      const data = await vehiclesService.updatVehicle(req.user,req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DELETE_VEHICLE]: async (req, res, next) => {
    try {
      const data = await vehiclesService.deleteVehicle(req.user,req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
