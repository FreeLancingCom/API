import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

router.get(
  '/',
  validateRequest(validationSchemas[CONTROLLERS.LIST_PACKAGES]),
  Controller[CONTROLLERS.LIST_PACKAGES]
);

router.get(
  '/:id',
  validateRequest(validationSchemas[CONTROLLERS.GET_PACKAGE]),
  Controller[CONTROLLERS.GET_PACKAGE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_PACKAGE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_PACKAGE]),
  Controller[CONTROLLERS.CREATE_PACKAGE]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_PACKAGE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_PACKAGE]),
  Controller[CONTROLLERS.UPDATE_PACKAGE]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_PACKAGE]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_PACKAGE]),
  Controller[CONTROLLERS.DELETE_PACKAGE]
);

export default router;