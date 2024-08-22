import _ from 'lodash';
import { CONTROLLERS } from '../helper/constants.js';
import productService from '../service/productService.js';
import logger from '../../../common/utils/logger/index.js';
import { StatusCodes } from 'http-status-codes';

export default {
  [CONTROLLERS.LIST_PRODUCTS]: async (req, res, next) => {
    try {
      const data = await productService.listProducts(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_PRODUCT]: async (req, res, next) => {
    try {
      const id = _.get(req, 'params.id', null);
      const data = await productService.getProduct(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.LIST_MAINTENANCE_CENTER_PRODUCTS]: async (req, res, next) => {
    try {
      const mcId = _.get(req, 'params.mcId', null);
      const data = await productService.listMaintenanceCenterProducts(mcId, req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_PRODUCT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const mcId = _.get(req, 'user.maintenanceCenterId', null);

      const data = await productService.createProduct(userId, mcId, req.body);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_PRODUCT]: async (req, res, next) => {
    try {
      const id = _.get(req, 'params.id', null);
      const mcId = _.get(req, 'user.maintenanceCenterId', null);
      const data = await productService.updateProduct(id, mcId, req.body);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DELETE_PRODUCT]: async (req, res, next) => {
    try {
      const id = _.get(req, 'params.id', null);
      const data = await productService.deleteProduct(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_PRODUCTS]: async (req, res, next) => {
    try {
      const data = await productService.countProducts(req.query);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
