import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';


const router = express.Router();




router.get(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.LIST_COUPONS]),
    validateRequest(validationSchemas[CONTROLLERS.LIST_COUPONS]),
    Controller[CONTROLLERS.LIST_COUPONS]
);

router.get(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.GET_COUPON]),
    validateRequest(validationSchemas[CONTROLLERS.GET_COUPON]),
    Controller[CONTROLLERS.GET_COUPON]
);


router.post(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.CREATE_COUPON]),
    validateRequest(validationSchemas[CONTROLLERS.CREATE_COUPON]),
    Controller[CONTROLLERS.CREATE_COUPON]
);


router.put(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_COUPON]),
    validateRequest(validationSchemas[CONTROLLERS.UPDATE_COUPON]),
    Controller[CONTROLLERS.UPDATE_COUPON]
);


router.delete(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.DELETE_COUPON]),
    validateRequest(validationSchemas[CONTROLLERS.DELETE_COUPON]),
    Controller[CONTROLLERS.DELETE_COUPON]
);



export default router;
