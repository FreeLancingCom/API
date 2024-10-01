import express from 'express';
import { CONTROLLERS } from '../helper/constant.js';
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
  Authorization.Authorize(Permissions[CONTROLLERS.GET_PROFILE]),
  Controller[CONTROLLERS.GET_PROFILE]
);

router.put(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_PROFILE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_PROFILE]),
  Controller[CONTROLLERS.UPDATE_PROFILE]
);

export default router;
