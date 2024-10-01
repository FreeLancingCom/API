import _ from 'lodash';
import { CONTROLLERS } from '../helpers/constants.js';
import productService from '../services/productService.js';
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
      const data = await productService.getProduct(req.params.id);
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
      const data = await productService.createProduct(userId, req.body);
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
      const usedId = _.get(req, 'user._id', null);
      const data = await productService.updateProduct(req.params.id,usedId ,  req.body);
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
      const data = await productService.deleteProduct(req.params.id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
 
};