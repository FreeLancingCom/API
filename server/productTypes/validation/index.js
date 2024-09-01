import Joi from 'joi';
import { CONTROLLERS, PRODUCT_STATUS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_PRODUCTS_TYPES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        status: Joi.string()
          .optional()
          .valid(...Object.values(PRODUCT_STATUS))
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
  },
  [CONTROLLERS.REQUEST_PRODUCT_TYPE]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      nameAr: Joi.string().required(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },

  [CONTROLLERS.COUNT_PRODUCT_TYPES]: {
    query: Joi.object()
      .keys({
        status: Joi.string()
          .optional()
          .valid(...Object.values(PRODUCT_STATUS))
      })
      .optional()
  }
};
