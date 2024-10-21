import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

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
      packageId: Joi.string().optional().default('undefined'),
      addedBy: Joi.forbidden(),
      availableQuantity: Joi.number().required(),
      price: Joi.object().keys({
        originalPrice: Joi.number().required(),              
        finalPrice: Joi.number()
          .required()
          .less(Joi.ref('originalPrice')) 
          .messages({
            'any.less': 'Final price must be less than the original price.'
          })
      }),
      images: Joi.array().items(Joi.string()),
      tags: Joi.array().items(Joi.string()),
      stars : Joi.number().default(0).valid(0,1,2,3,4,5),

    })
  },
  [CONTROLLERS.UPDATE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required() 
      })
      .required(),
    
    body: Joi.object().keys({
      name: Joi.string(),                          
      description: Joi.string().allow(''),         
      packageId: Joi.string().default('undefined'),
      availableQuantity: Joi.number(),            
      price: Joi.object().keys({
        originalPrice: Joi.number().required(),              
        finalPrice: Joi.number()
          .required()
          .less(Joi.ref('originalPrice')) 
          .messages({
            'any.less': 'Final price must be less than the original price.'
          })
      }),
      images: Joi.array().items(Joi.string()),     
      tags: Joi.array().items(Joi.string()),
      stars : Joi.number().default(0).valid(0,1,2,3,4,5),
    }).or('name', 'description', 'packageId', 'availableQuantity', 'price', 'images', 'tags') // Ensures at least one field is provided
  },
  
  [CONTROLLERS.DELETE_PRODUCT]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
};