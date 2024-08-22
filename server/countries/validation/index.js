import Joi from 'joi';
import { CONTROLLER } from '../helpers/constant.js';

export default {
  [CONTROLLER.LIST_COUNTRIES]: {
    query: Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().max(10).optional()
    }).optional()
  },
  [CONTROLLER.GET_COUNTRY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required()
  },
  [CONTROLLER.CREATE_COUNTRY]: {
    body: Joi.object({
      name: Joi.string().required(),
      nameAr: Joi.string().required()
    }).required()
  },
  [CONTROLLER.UPDATE_COUNTRY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required(),
    body: Joi.object({
      name: Joi.string().optional(),
      nameAr: Joi.string().optional()
    }).required()
  },
  [CONTROLLER.DELETE_COUNTRY]: {
    params: Joi.object({
      id: Joi.string().required()
    }).required()
  },
  [CONTROLLER.COUNT_COUNTRIES]: {
    query: Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().max(10).optional()
    }).optional()
  }
};
