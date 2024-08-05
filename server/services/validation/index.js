import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';
import { servicesTypes } from '../helpers/constants.js';

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
  [CONTROLLERS.GET_SERVICE]: {
    params: Joi.object()
      .keys({
        serviceId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_SERVICE]: {
    body: Joi.object()
      .keys({
        name: Joi.string().trim().min(2).required(),
        nameAr: Joi.string().trim().min(2).required(),
        type: Joi.string()
          .valid(...Object.values(servicesTypes))
          .required(),
        maintenanceCenterId: Joi.string().optional(),
        cost: Joi.number().min(0).required()
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
      name: Joi.string().trim().min(2).required(),
      nameAr: Joi.string().trim().min(2).required()
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
