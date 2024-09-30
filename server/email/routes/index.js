import express from 'express';
import { CONTROLLERS } from '../helper/constant.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();

router.post(
    '/send',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.SEND_EMAIL]),
    validateRequest(validationSchemas[CONTROLLERS.SEND_EMAIL]),
    Controller[CONTROLLERS.SEND_EMAIL],
);


export default router;