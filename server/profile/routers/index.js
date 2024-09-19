import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();


// CRUD


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
