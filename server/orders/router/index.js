import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();


router.get(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.LIST_ORDERS]),
    validateRequest(validationSchemas[CONTROLLERS.LIST_ORDERS]),
    Controller[CONTROLLERS.LIST_ORDERS]
);


router.get(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.GET_ORDER]),
    validateRequest(validationSchemas[CONTROLLERS.GET_ORDER]),
    Controller[CONTROLLERS.GET_ORDER]
);


router.post(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.CREATE_ORDER]),
    validateRequest(validationSchemas[CONTROLLERS.CREATE_ORDER]),
    Controller[CONTROLLERS.CREATE_ORDER]
);


router.put(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_ORDER]),
    validateRequest(validationSchemas[CONTROLLERS.UPDATE_ORDER]),
    Controller[CONTROLLERS.UPDATE_ORDER]
);



router.delete(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.DELETE_ORDER]),
    validateRequest(validationSchemas[CONTROLLERS.DELETE_ORDER]),
    Controller[CONTROLLERS.DELETE_ORDER]
);


export default router;