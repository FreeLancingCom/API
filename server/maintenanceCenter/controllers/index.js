import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import maintenanceCenterService from '../services/index.js';
import logger from '../../../common/utils/logger/index.js';

const { OK } = StatusCodes;

export default {
  [CONTROLLERS.LIST_MAINTENANCE_CENTERS]: async (req, res, next) => {
    try {
      const data = await maintenanceCenterService.listMaintenanceCenters(req.user, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_MAINTENANCE_CENTER]: async (req, res, next) => {
    try {
      const data = await maintenanceCenterService.getMaintenanceCenter(
        req.user,
        req.params.centerId
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
  [CONTROLLERS.CREATE_MAINTENANCE_CENTER]: async (req, res, next) => {
    try {
      const data = await maintenanceCenterService.createMaintenanceCenter(req.user, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_MAINTENANCE_CENTER]: async (req, res, next) => {
    try {
      const centerId = req.params.centerId;
      const data = await maintenanceCenterService.updateMaintenanceCenter(
        req.user,
        centerId,
        req.body
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
  [CONTROLLERS.DELETE_MAINTENANCE_CENTERS]: async (req, res, next) => {
    try {
      await maintenanceCenterService.deleteMaintenanceCenter(req.params.centerId);
      return res.status(OK).json({
        success: true
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
