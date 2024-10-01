import Joi from 'joi';
import { CONTROLLERS } from '../helper/constant.js';

export default {
  [CONTROLLERS.UPDATE_PROFILE]: {
    body: Joi.object().keys({
      isActive: Joi.forbidden(),
      role: Joi.forbidden(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
      photo: Joi.string().optional()
    })
  }
};
