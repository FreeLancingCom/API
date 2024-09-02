import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_COUPONS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },

  [CONTROLLERS.GET_COUPON]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.CREATE_COUPON]: {
    body: Joi.object()
      .keys({
        maintenanceCenterId: Joi.forbidden(),
        discount: Joi.object()
          .keys({
            percent: Joi.number().min(0).max(100).required(),
            value: Joi.number().min(0).required()
          })
          .required(),
        dueDate: Joi.date().required()
      })
      .required()
  },

  [CONTROLLERS.UPDATE_COUPON]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        maintenanceCenterId: Joi.forbidden(),
        discount: Joi.object()
          .keys({
            percent: Joi.number().min(0).max(100).optional(),
            value: Joi.number().min(0).optional()
          })
          .optional(),
        dueDate: Joi.date().optional()
      })
      .optional()
  },

  [CONTROLLERS.DELETE_COUPON]: {
    body: Joi.object()
      .keys({
        maintenanceCenterId: Joi.forbidden()
      })
      .required(),
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.COUNT_COUPONS]: {
    query: Joi.object()
      .keys({
        maintenanceCenterId: Joi.string().optional()
      })
      .optional()
  },
  [CONTROLLERS.APPLY_COUPON]: {
    body: Joi.object()
      .keys({
        code: Joi.string().required()
      })
      .required()
  }
};
