import Joi from 'joi';
import { CONTROLLERS , STATUS , INTEGRATION_TYPES  } from '../helpers/constants.js';


export default {
    [CONTROLLERS.CREATE_SLIDER]: {
        body: Joi.object().keys({
        name: Joi.string().required(),
        integration_type: Joi.string().valid(...Object.keys(INTEGRATION_TYPES)).required(),
        image: Joi.string().required(),
        link: Joi.string().required(),
        status: Joi.string().valid(...Object.keys(STATUS)).default(STATUS.ACTIVE)
        })
    },
    [CONTROLLERS.LIST_SLIDERS]: {
        query: Joi.object().keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
        }).optional()
    },
    [CONTROLLERS.GET_SLIDER]: {
        params: Joi.object().keys({
        id: Joi.string().required()
        })
    },
    [CONTROLLERS.UPDATE_SLIDER]: {
        params: Joi.object().keys({
        id: Joi.string().required()
        }),
        body: Joi.object().keys({
        name: Joi.string().optional(),
        integration_type: Joi.string().valid(...Object.keys(INTEGRATION_TYPES)).optional(),
        image: Joi.string().optional(),
        link: Joi.string().optional(),
        status: Joi.string().valid(...Object.keys(STATUS)).optional()
        })
    },
    [CONTROLLERS.DELETE_SLIDER]: {
        params: Joi.object().keys({
        id: Joi.string().required()
        })
    }
}