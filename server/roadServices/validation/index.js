import Joi from 'joi';
import { CONTROLLERS } from '../helper/constant.js';
export default {
  [CONTROLLERS.LIST_ROAD_SERVICES]: {
    query: Joi.object({
      limit: Joi.number().default(10),
      skip: Joi.number().default(0),
      sort: Joi.string().default('createdAt'),
      name: Joi.string(),
      type: Joi.string(),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      mapsLink: Joi.string()
    })
  },

  [CONTROLLERS.GET_ROAD_SERVICE]: {
    params: Joi.object({
      id: Joi.string().required()
    })
  },

  [CONTROLLERS.CREATE_ROAD_SERVICE]: {
    body: Joi.object({
      mapsLink: Joi.string().required(),
      address: Joi.string().required(),
      photo: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().required()
    })
  },

  [CONTROLLERS.UPDATE_ROAD_SERVICE]: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      mapsLink: Joi.string(),
      address: Joi.string(),
      photo: Joi.string(),
      phoneNumber: Joi.string(),
      name: Joi.string(),
      type: Joi.string()
    })
  },

  [CONTROLLERS.DELETE_ROAD_SERVICE]: {
    params: Joi.object({
      id: Joi.string().required()
    })
  },
  [CONTROLLERS.COUNT_ROAD_SERVICES]: {
    query: Joi.object({
      name: Joi.string(),
      type: Joi.string(),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      mapsLink: Joi.string()
    })
  }
};
