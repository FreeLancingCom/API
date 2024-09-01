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
      typeId: Joi.string().required(),
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
      tags: Joi.array().items(Joi.string())
    })
  },
  [CONTROLLERS.UPDATE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      typeId: Joi.string().forbidden(),
      name: Joi.string().forbidden(),
      nameAr: Joi.string().forbidden(),
      maintenanceCenterId: Joi.string().forbidden()
    })
  },
  [CONTROLLERS.DELETE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
};
