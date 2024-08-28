import productTypesServices from '../service/productTypesServices.js';
import { CONTROLLERS } from '../helper/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {
  [CONTROLLERS.LIST_PRODUCTS_TYPES]: async (req, res, next) => {
    try {
      const data = await productTypesServices.listProductsTypes(req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const data = await productTypesServices.getProductType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id');
      const data = await productTypesServices.createProductType(req.body, userId);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const data = await productTypesServices.updateProductType(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const data = await productTypesServices.deleteProductType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.APPROVE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const data = await productTypesServices.approveProductType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DECLINE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const data = await productTypesServices.declineProductType(req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
