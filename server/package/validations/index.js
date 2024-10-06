import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_PACKAGES]: {
    query: Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional()
    })
  },
  [CONTROLLERS.GET_PACKAGE]: {
    params: Joi.object({
      id: Joi.string().required()
    })
  },
  [CONTROLLERS.CREATE_PACKAGE]: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().optional(),
      price: Joi.object({
        originalPrice: Joi.number().required(),
        finalPrice: Joi.number().required().when('originalPrice', {
          is: Joi.number(),
          then: Joi.number().max(Joi.ref('originalPrice')).messages({
            'number.max': 'finalPrice must be less than or equal to originalPrice',
          }),
          otherwise: Joi.number().required(),
        }),
      }).required(),
      availableQuantity: Joi.number().required()
    })
  },
  [CONTROLLERS.UPDATE_PACKAGE]: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      price: Joi.object({
        originalPrice: Joi.number().required(),
        finalPrice: Joi.number().required().when('originalPrice', {
          is: Joi.number(),
          then: Joi.number().max(Joi.ref('originalPrice')).messages({
            'number.max': 'finalPrice must be less than or equal to originalPrice',
          }),
          otherwise: Joi.number().required(),
        }),
      }).optional(),
      availableQuantity: Joi.number().optional()
    })
  },

  [CONTROLLERS.DELETE_PACKAGE]: {
    params: Joi.object({
      id: Joi.string().required()
    })
  }
};