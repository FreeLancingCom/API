import productTypesServices from '../services/productTypesServices.js';
import { CONTROLLERS } from '../helpers/constants.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import _ from 'lodash';

export default {

  [CONTROLLERS.LIST_PRODUCTS_TYPES]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const data = await productTypesServices.listProductsTypes(userRole, req.query);
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
      const userId = _.get(req, 'user._id', null);
      const data = await productTypesServices.createProductType(userId, req.body);
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
      const userId = _.get(req, 'user._id', null);
      const data = await productTypesServices.approveProductType(userId, req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DECLINE_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await productTypesServices.declineProductType(userId, req.params.id);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.REQUEST_PRODUCT_TYPE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id');
      const data = await productTypesServices.requestProductType(userId, req.body);
      return res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_PRODUCT_TYPES]: async (req, res, next) => {
    try {
      const userRole = _.get(req, 'user.role', null);
      const data = await productTypesServices.countProductTypes(userRole, req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
