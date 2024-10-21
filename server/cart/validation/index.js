import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_CART]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },

  [CONTROLLERS.CREATE_CART_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        quantity: Joi.number().min(1).required()
      })
      .required()
  },

  [CONTROLLERS.CREATE_CART_PACKAGE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        quantity: Joi.number().min(1).required()
      })
      .required()
  },

  [CONTROLLERS.DELETE_CART_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.DELETE_CART_PACKAGE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.UPDATE_CART_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        quantity: Joi.number().min(1).optional(),
        price: Joi.number().optional()
      })
      .required()
  },

  [CONTROLLERS.UPDATE_CART_PACKAGE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        quantity: Joi.number().min(1).optional(),
        price: Joi.number().optional()
      })
      .required()
  },

  [CONTROLLERS.INCREASE_PRODUCT_QUANTITY]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.DECREASE_PRODUCT_QUANTITY]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.INCREASE_PACKAGE_QUANTITY]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.DECREASE_PACKAGE_QUANTITY]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.APPLY_COUPON]: {
    body: Joi.object().keys({
      code: Joi.string().required()
    })
  }
};
