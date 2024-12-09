import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';


const router = express.Router();


router.get(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.LIST_DELIVERY_EMAILS]),
    Controller[CONTROLLERS.LIST_DELIVERY_EMAILS],
);

router.get(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.GET_DELIVERY_EMAIL]),
    Controller[CONTROLLERS.GET_DELIVERY_EMAIL],
);

router.post(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.CREATE_DELIVERY_EMAIL]),
    validateRequest(validationSchemas[CONTROLLERS.CREATE_DELIVERY_EMAIL]),
    Controller[CONTROLLERS.CREATE_DELIVERY_EMAIL],
);

router.put(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_DELIVERY_EMAIL]),
    validateRequest(validationSchemas[CONTROLLERS.UPDATE_DELIVERY_EMAIL]),
    Controller[CONTROLLERS.UPDATE_DELIVERY_EMAIL],
);

router.delete(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.DELETE_DELIVERY_EMAIL]),
    Controller[CONTROLLERS.DELETE_DELIVERY_EMAIL],
);


export default router;