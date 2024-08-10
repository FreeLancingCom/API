import Joi from 'joi';
import { CONTROLLERS } from '../helper/constants.js';
export default {
  [CONTROLLERS.LIST_PRODUCTS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        minPrice: Joi.number().optional(),
        maxPrice: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_PRODUCT]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().allow(''),
      availableQuantity: Joi.number().required(),
      price: Joi.object()
        .keys({
          originalPrice: Joi.number().required(),
          finalPrice: Joi.number().required()
        })
      .required(),
      currency: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      specifications: Joi.object().pattern(Joi.string(), Joi.any()),
      legalDoc: Joi.string(),
      video: Joi.string().optional(),
      active: Joi.bool().default(true),
      tags: Joi.array().items(Joi.string()),
      category: Joi.string().required(),
    })
  },
  [CONTROLLERS.UPDATE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.DELETE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.LIST_MAINTENANCE_CENTER_PRODUCTS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        mcId : Joi.string().required()
      })
      .optional()
  }
};
