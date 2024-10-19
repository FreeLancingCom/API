import Joi from 'joi';
import { CONTROLLERS } from '../helper/constant.js';
export default {
  [CONTROLLERS.LIST_COMMENTS] : {
    params: Joi.object({
      id: Joi.string().required()
    })
  },
  [CONTROLLERS.ADD_COMMENT] : {
    body: Joi.object({
      productId: Joi.string().required(),
      content: Joi.string().required(),
      stars : Joi.number().required().valid(1,2,3,4,5),
      user : Joi.forbidden()
    })
  },
  [CONTROLLERS.LIST_ALL_COMMENTS] : {
    query: Joi.object({
      limit: Joi.number().integer().min(1).max(50).default(10),
      skip: Joi.number().integer().min(0).default(0),
      sort: Joi.string().default('createdAt'),
    })
  }
};
