import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';


export default {
    [CONTROLLERS.CREATE_DELIVERY_EMAIL]: {
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),

        })
    },
    [CONTROLLERS.LIST_DELIVERY_EMAILS]: {
        query: Joi.object().keys({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        }).optional()
    },
    [CONTROLLERS.GET_DELIVERY_EMAIL]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        })
    },
    [CONTROLLERS.UPDATE_DELIVERY_EMAIL]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        }),
        body: Joi.object().keys({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
        })
    },
    [CONTROLLERS.DELETE_DELIVERY_EMAIL]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        })
    }
}