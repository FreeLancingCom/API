import Joi from 'joi';
import { CONTROLLERS } from '../helper/constant.js';
export default {
  [CONTROLLERS.LIST_ADDRESSES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_ADDRESS]: {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        countryId: Joi.string().required(),
        cityId: Joi.string().required(),
        firstLine: Joi.string().required(),
        secondLine: Joi.string().optional(),
        googleMapsLink: Joi.string().optional()
      })
      .required()
  },
  [CONTROLLERS.UPDATE_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        name: Joi.string().optional(),
        countryId: Joi.string().optional(),
        cityId: Joi.string().optional(),
        firstLine: Joi.string().optional(),
        secondLine: Joi.string().optional(),
        googleMapsLink: Joi.string().optional()
      })
      .optional()
  },
  [CONTROLLERS.DELETE_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  }
};
