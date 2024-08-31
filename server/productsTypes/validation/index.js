import Joi from 'joi';
import { CONTROLLERS } from '../helper/constants.js';
import { PRODUCT_STATUS } from '../helper/constants.js';

export default {
  [CONTROLLERS.LIST_PRODUCTS_TYPES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        status: Joi.string().optional().valid(PRODUCT_STATUS),
        minPrice: Joi.number().optional(),
        maxPrice: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_PRODUCT_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_PRODUCT_TYPE]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      nameAr: Joi.string().required(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },

  [CONTROLLERS.UPDATE_PRODUCT_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().optional(),
      nameAr: Joi.string().optional(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },
  [CONTROLLERS.DELETE_PRODUCT_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.APPROVE_PRODUCT_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.DECLINE_PRODUCT_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  }
};
