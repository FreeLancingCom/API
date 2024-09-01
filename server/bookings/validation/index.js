import Joi from 'joi';
import { CONTROLLERS,ENGINE_TYPE,GEAR_SHIFT_TYPE } from '../helpers/constants.js';
import { status } from 'express/lib/response.js';

export default {
  [CONTROLLERS.CLIENT_LIST_BOOKINGS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.Provider_LIST_BOOKINGS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.ADMIN_LIST_BOOKINGS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.COUNT_BOOKINGS]: {},
  [CONTROLLERS.GET_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_BOOKING]: {
    body: Joi.object().keys({
      providerId: Joi.string().required(),
      // copounId: Joi.string(),
      services: Joi.array().items(Joi.string()).required(),
      products: Joi.array().items(Joi.string()).required(),
      vehicleId:Joi.string().required(),
      bookingTime:Joi.date().required()
      
    })
  },
  [CONTROLLERS.UPDATE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        providerId: Joi.string().optional(),
        // copounId: Joi.string().optional(),
        services: Joi.array().items(Joi.string()).optional(),
        products: Joi.array().items(Joi.string()).optional(),
        vehicleId:Joi.string().optional(),
        bookingTime:Joi.date().optional()

      })
      .required()
  },
  [CONTROLLERS.APPROVE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  [CONTROLLERS.DECLINE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  [CONTROLLERS.COMPLETE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  [CONTROLLERS.DELETE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
 
};
