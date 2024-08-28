import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';
import { serviceTemplateStatuses } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_ADMIN]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional(),
        name: Joi.string().optional(),
        nameAr: Joi.string().optional(),
        status: Joi.string()
          .valid(...Object.values(serviceTemplateStatuses))
          .optional()
      })
      .optional()
  },
  [CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_PROVIDER]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional(),
        name: Joi.string().optional(),
        nameAr: Joi.string().optional(),
        status: Joi.string()
          .valid(...Object.values(serviceTemplateStatuses))
          .optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_SERVICE_TEMPLATE]: {
    params: Joi.object()
      .keys({
        serviceTemplateId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_SERVICE_TEMPLATE]: {
    body: Joi.object()
      .keys({
        name: Joi.string().trim().min(2).required(),
        nameAr: Joi.string().trim().min(2).required()
      })
      .required()
  },
  [CONTROLLERS.UPDATE_SERVICE_TEMPLATE_ADMIN]: {
    params: Joi.object()
      .keys({
        serviceTemplateId: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().trim().min(2).optional(),
      nameAr: Joi.string().trim().min(2).optional(),
      status: Joi.string()
        .valid(...Object.values(serviceTemplateStatuses))
        .optional()
    })
  },
  [CONTROLLERS.UPDATE_SERVICE_TEMPLATE_PROVIDER]: {
    params: Joi.object()
      .keys({
        serviceTemplateId: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().trim().min(2).optional(),
      nameAr: Joi.string().trim().min(2).optional()
    })
  },
  [CONTROLLERS.DELETE_SERVICE_TEMPLATES]: {
    params: Joi.object()
      .keys({
        serviceTemplateId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.REQUEST_SERVICE_TEMPLATE]: {
    body: Joi.object()
      .keys({
        name: Joi.string().trim().min(2).required(),
        nameAr: Joi.string().trim().min(2).required()
      })
      .required()
  },
  [CONTROLLERS.CLONE_SERVICE_TEMPLATE_FOR_PROVIDER]: {
    params: Joi.object()
      .keys({
        serviceTemplateId: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      maintenanceCenterId: Joi.string().required()
    })
  }
};
