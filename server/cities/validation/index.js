import Joi from 'joi';
import { CONTROLLER } from '../helpers/constant.js';

export default {
  [CONTROLLER.LIST_CITIES]: {
    query: Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().max(10).optional()
    }).optional()
  },
  [CONTROLLER.GET_CITY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required()
  },
  [CONTROLLER.CREATE_CITY]: {
    body: Joi.object({
      name: Joi.string().required(),
      nameAr: Joi.string().required(),
      countryId: Joi.string().required()
    }).required()
  },
  [CONTROLLER.UPDATE_CITY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required(),
    body: Joi.object({
      name: Joi.string().optional(),
      nameAr: Joi.string().optional(),
      countryId: Joi.string().optional()
    }).required()
  },
  [CONTROLLER.DELETE_CITY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required()
  },
  [CONTROLLER.COUNT_CITIES]: {
    query: Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().max(10).optional()
    }).optional()
  }
};
