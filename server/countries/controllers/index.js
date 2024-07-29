import countriesService from '../services/countriesService.js';
import { CONTROLLER } from '../helpers/constant.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLER.LIST_COUNTRIES]: async (req, res, next) => {
    try {
      const { data, options } = await countriesService.listCountries(req.query);
      res.status(StatusCodes.OK).json({ success: true, data, options });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.GET_COUNTRY]: async (req, res, next) => {
    try {
      const data = await countriesService.getCountry(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.CREATE_COUNTRY]: async (req, res, next) => {
    try {
      const data = await countriesService.createCountry(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.UPDATE_COUNTRY]: async (req, res, next) => {
    try {
      const data = await countriesService.updateCountry(req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLER.DELETE_COUNTRY]: async (req, res, next) => {
    try {
      const data = await countriesService.deleteCountry(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
