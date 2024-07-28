import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_NOTIFICATIONS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_NOTIFICATION]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_NOTIFICATION]: {
    body: Joi.object()
      .keys({
        targets: Joi.array().unique().optional(),
        contentType: Joi.string().valid('ad', 'message').required(),
        // adId: Joi.string().when('contentType', {
        //   is: 'ad',
        //   then: Joi.required(),
        //   otherwise: Joi.forbidden() // Ensures adId is not allowed when contentType is not 'ad'
        // }),
        message: Joi.string().when('contentType', {
          is: 'message',
          then: Joi.required(),
          otherwise: Joi.forbidden() // Ensures message is not allowed when contentType is not 'message'
        }),
        sender: Joi.forbidden(),
        date: Joi.forbidden()
      })
      .required()
  },
  [CONTROLLERS.DELETE_NOTIFICATION]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  }
};
