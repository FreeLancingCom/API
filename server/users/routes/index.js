import express from 'express';
import { CONTROLLERS } from '../helpers/constant.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();



router.post(
    '/login',
    validateRequest(validationSchemas[CONTROLLERS.LOGIN]),
    Controller[CONTROLLERS.LOGIN]
);

router.post(
    '/signup',
    validateRequest(validationSchemas[CONTROLLERS.SIGNUP]),
    Controller[CONTROLLERS.SIGNUP]
);


router.post(
    '/refresh-token',
    Controller[CONTROLLERS.REFRESH_TOKEN]
);





export default  router;