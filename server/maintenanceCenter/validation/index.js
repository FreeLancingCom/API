import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

const addressSchema = Joi.object().keys({
  city: Joi.string().required(),
  firstLine: Joi.string().required()
});

export default {
  [CONTROLLERS.LIST_MAINTENANCE_CENTERS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional(),
        name: Joi.string().optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_MAINTENANCE_CENTER]: {
    params: Joi.object()
      .keys({
        centerId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_MAINTENANCE_CENTER]: {
    body: Joi.object()
      .keys({
        name: Joi.string().trim().min(2).required(),
        landline: Joi.string().min(5).optional(),
        taxRegistrationNo: Joi.string().min(5).optional(),
        commercialRegistrationNo: Joi.string().min(5).optional(),
        address: addressSchema.required(),
        countryId: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.UPDATE_MAINTENANCE_CENTER]: {
    params: Joi.object()
      .keys({
        centerId: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      name: Joi.string().trim().min(2).optional(),
      landline: Joi.string().min(5).optional(),
      taxRegistrationNo: Joi.string().min(5).optional(),
      commercialRegistrationNo: Joi.string().min(5).optional(),
      admins: Joi.array().items(Joi.string()).optional(),
      address: addressSchema.optional(),
      countryId: Joi.string().optional()
    })
  },
  [CONTROLLERS.DELETE_MAINTENANCE_CENTERS]: {
    params: Joi.object()
      .keys({
        centerId: Joi.string().required()
      })
      .required()
  }
};
