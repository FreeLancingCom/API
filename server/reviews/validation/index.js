import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_REVIEWS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.COUNT_REVIEWS]: {},
  [CONTROLLERS.GET_REVIEW]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_REVIEW]: {
    body: Joi.object().keys({
      bookingId: Joi.string().required(),
      employeesBehavior: Joi.number().required().min(1).max(5),
      speed: Joi.number().required().min(1).max(5),
      honesty: Joi.number().required().min(1).max(5),
      fairCost: Joi.number().required().min(1).max(5),
      efficiency: Joi.number().required().min(1).max(5)
    })
  },
  [CONTROLLERS.UPDATE_REVIEW]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        bookingId: Joi.string().forbidden(),
        userId: Joi.string().forbidden(),
        maintenancerCenterId: Joi.string().forbidden(),
        employeesBehavior: Joi.number().min(1).max(5).required(),
        speed: Joi.number().min(1).max(5).required(),
        honesty: Joi.number().min(1).max(5).required(),
        fairCost: Joi.number().min(1).max(5).required(),
        efficiency: Joi.number().min(1).max(5).required()
      })
      .required()
  },
  [CONTROLLERS.DELETE_REVIEW]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

};
