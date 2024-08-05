import Joi from 'joi';
import { CONTROLLERS } from '../helper/constants.js';
import { PRODUCT_STATUS } from '../helper/constants.js';
export default {
  [CONTROLLERS.LIST_PRODUCTS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        status: Joi.string().optional().valid(PRODUCT_STATUS),
        // categoryId: Joi.string().optional(),
        // subcategoryId: Joi.alternatives()
        //   .try(Joi.string(), Joi.array().items(Joi.string()))
        //   .optional(),
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
      // subcategoryId: Joi.array().items(Joi.string()).required(),
      // brandId: Joi.string(),
      price: Joi.object()
        .keys({
          originalPrice: Joi.number().required(),
          finalPrice: Joi.number().required()
        })
        .required(),
      offer: Joi.object().keys({
        offerType: Joi.string().required(),
        from: Joi.date(),
        to: Joi.date()
      }),
      currency: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      specifications: Joi.object().pattern(Joi.string(), Joi.any()),
      legalDoc: Joi.string(),
      video: Joi.string().optional(),
      active: Joi.bool().default(true),
      tags: Joi.array().items(Joi.string())
    })
  },
  [CONTROLLERS.UPDATE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
    // body: Joi.object().keys({
    //   subcategoryId: Joi.array().items(Joi.string()).optional()
    // })
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
        status: Joi.string().optional().valid(PRODUCT_STATUS)
      })
      .optional()
  }
};
