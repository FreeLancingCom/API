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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_SERVICES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_SERVICES]),
  Controller[CONTROLLERS.LIST_SERVICES]
);

router.get(
  '/:serviceId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_SERVICE]),
  Controller[CONTROLLERS.GET_SERVICE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_SERVICE]),
  Controller[CONTROLLERS.CREATE_SERVICE]
);

router.put(
  '/:serviceId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_SERVICE]),
  Controller[CONTROLLERS.UPDATE_SERVICE]
);

router.delete(
  '/:serviceId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_SERVICES]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_SERVICES]),
  Controller[CONTROLLERS.DELETE_SERVICES]
);

export default router;
