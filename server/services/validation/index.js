import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_SERVICES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional(),
        name: Joi.string().optional(),
        nameAr: Joi.string().optional()
      })
      .optional()
  },
  [CONTROLLERS.LIST_SERVICE_BY_CLIENT]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional(),
        name: Joi.string().optional(),
        nameAr: Joi.string().optional(),
        maintenanceCenterId: Joi.string().required()
      })
      .optional()
  },
  [CONTROLLERS.GET_SERVICE]: {
    params: Joi.object()
      .keys({
        serviceId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.GET_SERVICE_BY_CLIENT]: {
    params: Joi.object()
      .keys({
        serviceId: Joi.string().required()
      })
      .required(),
    query: Joi.object()
      .keys({
        maintenanceCenterId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_SERVICE]: {
    body: Joi.object()
      .keys({
        name: Joi.string().trim().min(2).required(),
        nameAr: Joi.string().trim().min(2).required(),
        maintenanceCenterId: Joi.string().optional(),
        cost: Joi.number().min(0).required(),
        model: Joi.string().optional()
      })
      .required()
  },
  [CONTROLLERS.UPDATE_SERVICE]: {
    params: Joi.object()
      .keys({
        serviceId: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().trim().min(2).optional(),
      nameAr: Joi.string().trim().min(2).optional(),
      cost: Joi.number().min(0).optional(),
      model: Joi.string().optional()
    })
  },
  [CONTROLLERS.DELETE_SERVICES]: {
    params: Joi.object()
      .keys({
        serviceId: Joi.string().required()
      })
      .required()
  }
};
