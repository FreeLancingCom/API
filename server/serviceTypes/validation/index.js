import Joi from 'joi';
import { CONTROLLERS, SERVICE_STATUS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_SERVICES_TYPES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        status: Joi.string()
          .optional()
          .valid(...Object.values(SERVICE_STATUS))
      })
      .optional()
  },
  [CONTROLLERS.GET_SERVICE_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_SERVICE_TYPE]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      nameAr: Joi.string().required(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },

  [CONTROLLERS.UPDATE_SERVICE_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().optional(),
      nameAr: Joi.string().optional(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },
  [CONTROLLERS.DELETE_SERVICE_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.APPROVE_SERVICE_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.DECLINE_SERVICE_TYPE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.REQUEST_SERVICE_TYPE]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      nameAr: Joi.string().required(),
      status: Joi.string().forbidden(),
      creatorId: Joi.string().forbidden()
    })
  },

  [CONTROLLERS.COUNT_SERVICE_TYPES]: {
    query: Joi.object()
      .keys({
        status: Joi.string()
          .optional()
          .valid(...Object.values(SERVICE_STATUS))
      })
      .optional()
  }
};
