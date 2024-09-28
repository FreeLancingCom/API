
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
          role: Joi.string()
            .valid(
              USER_ROLES.OWNER,
              USER_ROLES.CLIENT
            )
            .required(),
          isVerified: Joi.boolean().optional().default(false),
        }),
        // query: Joi.object().keys({
    
      },


      [CONTROLLERS.LOGIN]: {
        body: Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        })
      }

}