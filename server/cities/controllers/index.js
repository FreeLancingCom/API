import cityService from '../services/cityService.js';
import { CONTROLLER } from '../helpers/constant.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLER.LIST_CITIES]: async (req, res, next) => {
    try {
      const { data, options } = await cityService.listCountries(req.query);
      res.status(StatusCodes.OK).json({ success: true, data, options });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.GET_CITY]: async (req, res, next) => {
    try {
      const data = await cityService.getCity(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.CREATE_CITY]: async (req, res, next) => {
    try {
      const data = await cityService.createCity(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.UPDATE_CITY]: async (req, res, next) => {
    try {
      const data = await cityService.updateCity(req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.DELETE_CITY]: async (req, res, next) => {
    try {
      const data = await cityService.deleteCity(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
