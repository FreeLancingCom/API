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
    Authorization.Authorize(Permissions[CONTROLLERS.LIST_SLIDERS]),
    Controller[CONTROLLERS.LIST_SLIDERS],
);

router.get(
    '/:id',
    Authorization.Authorize(Permissions[CONTROLLERS.GET_SLIDER]),
    Controller[CONTROLLERS.GET_SLIDER],
);

router.post(
    '/',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.CREATE_SLIDER]),
    validateRequest(validationSchemas[CONTROLLERS.CREATE_SLIDER]),
    Controller[CONTROLLERS.CREATE_SLIDER],
);

router.put(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_SLIDER]),
    validateRequest(validationSchemas[CONTROLLERS.UPDATE_SLIDER]),
    Controller[CONTROLLERS.UPDATE_SLIDER],
);

router.delete(
    '/:id',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.DELETE_SLIDER]),
    Controller[CONTROLLERS.DELETE_SLIDER],
);


export default router;