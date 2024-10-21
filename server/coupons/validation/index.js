import Joi  from 'joi';
import { CONTROLLERS , COUPON_TYPES } from '../helpers/constants.js';



export default {
    [CONTROLLERS.LIST_COUPONS]: {
        query: Joi.object().keys({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
            minDiscount: Joi.number().optional(),
            maxDiscount: Joi.number().optional()
        }).optional()
    },
    [CONTROLLERS.GET_COUPON]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        }).required()
    },

    [CONTROLLERS.CREATE_COUPON]: {
        body: Joi.object().keys({
            code: Joi.string().required(),
            discount:Joi.object().keys({
                type: Joi.string().valid(...Object.keys(COUPON_TYPES)).required(),
                value: Joi.number().required()
            }).required(),
            expiryDate: Joi.date().required()
        })
    },
    [CONTROLLERS.UPDATE_COUPON]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        }).required(),
        body: Joi.object().keys({
            code: Joi.string().optional(),
            discount: Joi.object().keys({
                type: Joi.string().valid(...Object.keys(COUPON_TYPES)).optional(),
                value: Joi.number().optional()
            }).optional(),
            expiryDate: Joi.date().optional()
        })
    },

    [CONTROLLERS.DELETE_COUPON]: {
        params: Joi.object().keys({
            id: Joi.string().required()
        }).required()
    },
    [CONTROLLERS.APPLY_COUPON]: {
        body: Joi.object().keys({
            code: Joi.string().required()
        })
    }
}