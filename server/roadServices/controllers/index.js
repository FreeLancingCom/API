import roadServicesService from '../services/roadServicesService.js';
import { CONTROLLERS } from '../helper/constant.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_ROAD_SERVICES]: async (req, res, next) => {
    try {
      const role = _.get(req, 'user.role', null);
      const data = await roadServicesService.listRoadServices(req.query, role);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_ROAD_SERVICE]: async (req, res, next) => {
    try {
      const data = await roadServicesService.getRoadService(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_ROAD_SERVICE]: async (req, res, next) => {
    try {
      const data = await roadServicesService.createRoadService(req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.COUNT_ROAD_SERVICES]: async (req, res, next) => {
    try {
      const data = await roadServicesService.countRoadServices(req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_ROAD_SERVICE]: async (req, res, next) => {
    try {
      const data = await roadServicesService.updateRoadService(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_ROAD_SERVICE]: async (req, res, next) => {
    try {
      const data = await roadServicesService.deleteRoadService(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
