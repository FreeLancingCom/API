import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {

  [CONTROLLERS.UPDATE_PROFILE]: {
    body: Joi.object().keys({
      isActive: Joi.forbidden(),
      role: Joi.forbidden(),
      fullName: Joi.string().optional(),
      phoneNumber: Joi.string().optional(),
      password: Joi.string().optional(),
      email: Joi.string().optional(),
      maintenanceCenterId: Joi.forbidden(),
    })
  }
  
};
