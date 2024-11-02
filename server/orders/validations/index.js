import Joi from 'joi';
import {
  CONTROLLERS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS
} from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_ORDERS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_ORDER]: {
    params: Joi.object()
      .keys({
        id: Joi.string()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/)
      })
      .required()
  },
  [CONTROLLERS.CREATE_ORDER]: {
    body: Joi.object().keys({
      cart: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      paymentMethod: Joi.string()
        .valid(...Object.keys(PAYMENT_METHODS))
        .required(),
      paymentStatus: Joi.string()
        .valid(...Object.keys(PAYMENT_STATUS))
        .default(PAYMENT_STATUS['PENDING']),
      address: Joi.object()
        .keys({
          firstLine: Joi.string().required(),
          secondLine: Joi.string().optional(),
          googleLocation: Joi.string().required(),
          street: Joi.string().required(),
          city: Joi.string().required(),
          postalCode: Joi.string().required(),
          country: Joi.string().required()
        })
        .required(),
      user: Joi.forbidden(),
      status: Joi.string()
        .valid(...Object.keys(ORDER_STATUS))
        .default(ORDER_STATUS['PENDING'])
    })
  },
  [CONTROLLERS.UPDATE_ORDER]: {
    params: Joi.object()
      .keys({
        id: Joi.string()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/)
      })
      .required(),
    body: Joi.object().keys({
      cart: Joi.forbidden(),
      user: Joi.forbidden(),
      status: Joi.string()
        .valid(...Object.keys(ORDER_STATUS))
        .optional(),
      paymentMethod: Joi.string()
        .valid(...Object.keys(PAYMENT_METHODS))
        .optional(),
      paymentStatus: Joi.string()
        .valid(...Object.keys(PAYMENT_STATUS))
        .optional(),
      address: Joi.object()
        .keys({
          street: Joi.string().optional(),
          city: Joi.string().optional(),
          postalCode: Joi.string().optional(),
          country: Joi.string().optional()
        })
        .optional()
    })
  },

  [CONTROLLERS.DELETE_ORDER]: {
    params: Joi.object()
      .keys({
        id: Joi.string()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/)
      })
      .required()
  },

  [CONTROLLERS.REFUND_ORDER]: {
    body: Joi.object().keys({
      orderId: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
    })
  }

};
