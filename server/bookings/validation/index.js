import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

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
        // copounId: Joi.string().optional(),
        services: Joi.array().items(Joi.string()).optional(),
        products: Joi.array().items(Joi.string()).optional(),
        vehicleId:Joi.string().optional(),
        bookingTime:Joi.date().optional()

      })
      .required()
  },
  
  [CONTROLLERS.RESCHEDULE_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        bookingTime:Joi.date().optional()

      })
      .required()
  },
  [CONTROLLERS.APPROVE_CLIENT_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  [CONTROLLERS.DECLINE_CLIENT_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  
  [CONTROLLERS.APPROVE_PROVIDER_BOOKING]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
  },
  [CONTROLLERS.DECLINE_PROVIDER_BOOKING]: {
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
 
};
