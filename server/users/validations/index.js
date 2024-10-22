import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constant.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

export default {
  [CONTROLLERS.SIGNUP]: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
      photo: Joi.string().optional(),
      role: Joi.string().valid(USER_ROLES.OWNER, USER_ROLES.CLIENT).default(USER_ROLES['CLIENT']),
      isVerified: Joi.boolean().optional().default(false),
      phoneNumber: Joi.string().required()
    })
  },

  [CONTROLLERS.LOGIN]: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
  ,
  [CONTROLLERS.LIST_USERS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_USER]: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },

  [CONTROLLERS.UPDATE_USER]: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object().keys({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      photo: Joi.string().optional(),
      role: Joi.string().valid(...Object.values(USER_ROLES)).optional(),
      isVerified: Joi.boolean().optional().valid(true, false)
    })
  },


  [CONTROLLERS.DELETE_USER]: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },




  }

