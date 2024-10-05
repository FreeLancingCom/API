import packageService from '../services/packageService.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_PACKAGES]: async (req, res, next) => {
    try {
      const data = await packageService.listPackages(req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_PACKAGE]: async (req, res, next) => {
    try {
      const data = await packageService.getPackage(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_PACKAGE]: async (req, res, next) => {
    try {
      const data = await packageService.createPackage(req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_PACKAGE]: async (req, res, next) => {
    try {
      const data = await packageService.updatePackage(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_PACKAGE]: async (req, res, next) => {
    try {
      const data = await packageService.deletePackage(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};