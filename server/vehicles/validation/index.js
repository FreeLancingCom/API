import Joi from 'joi';
import { CONTROLLERS,ENGINE_TYPE,GEAR_SHIFT_TYPE } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_VEHICLES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.COUNT_VEHICLES]: {},
  [CONTROLLERS.GET_VEHICLE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_VEHICLE]: {
    body: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      modelAr: Joi.string(),
      tankCapacity: Joi.string(),
      motorNumber: Joi.string(),
      chassisNumber: Joi.string(),
      CCNumber:Joi.number(),
      plateNumber: Joi.string().required(),
      engineType: Joi.string()
        .valid(
          ENGINE_TYPE.DIESEL,
          ENGINE_TYPE.PETROL,
          ENGINE_TYPE.ELECTRIC,
          ENGINE_TYPE.HYPIRD,
        ),
        gearShiftType: Joi.string()
        .valid(
          GEAR_SHIFT_TYPE.AUTO,
          GEAR_SHIFT_TYPE.MANUAL,
        )

    })
  },
  [CONTROLLERS.UPDATE_VEHICLE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        make: Joi.string().optional(),
        model: Joi.string().optional(),
        modelAr: Joi.string().optional(),
        tankCapacity: Joi.string().optional(),
        motorNumber: Joi.string().optional(),
        chassisNumber: Joi.string().optional(),
        CCNumber:Joi.number().optional(),
        plateNumber: Joi.string().optional(),
        engineType: Joi.string().optional()
          .valid(
            ENGINE_TYPE.DIESEL,
            ENGINE_TYPE.PETROL,
            ENGINE_TYPE.ELECTRIC,
            ENGINE_TYPE.HYPIRD,
          ).optional(),
          gearShiftType: Joi.string()
          .valid(
            GEAR_SHIFT_TYPE.AUTO,
            GEAR_SHIFT_TYPE.MANUAL,
          ).optional()
    
      })
      .required()
  },
  [CONTROLLERS.DELETE_VEHICLE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
 
};
