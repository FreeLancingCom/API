import Joi from 'joi';
import { CONTROLLERS , EMAIL_TEMPLATES_DETAILS } from '../helper/constant.js';








const dynamicVarsSchema = Joi.object({
    username: Joi.string().required(),
    verifyEmailLink: Joi.string().required(),
    language: Joi.string().valid('en', 'ar').default('en')
  }).required();




const TEMPLATE_KEYS = Object.keys(EMAIL_TEMPLATES_DETAILS).map(key => key);

const emailSchema = {
  body: Joi.object()
    .keys({
      targets: Joi.array().items(Joi.string().email()).required(),
      sender: Joi.string().required(),
      templateData: Joi.object()
        .keys({
          templateKey: Joi.string().valid(...Object.values(TEMPLATE_KEYS)).required(), 
          dynamicVars: dynamicVarsSchema
        })
        .required()
    })
    .required()
};

export default {
    [CONTROLLERS.SEND_EMAIL]: emailSchema,
};