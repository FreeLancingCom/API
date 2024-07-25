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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_NOTIFICATIONS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_NOTIFICATIONS]),
  Controller[CONTROLLERS.LIST_NOTIFICATIONS]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_NOTIFICATIONS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_NOTIFICATIONS]),
  Controller[CONTROLLERS.COUNT_NOTIFICATIONS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_NOTIFICATION]),
  validateRequest(validationSchemas[CONTROLLERS.GET_NOTIFICATION]),
  Controller[CONTROLLERS.GET_NOTIFICATION]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_NOTIFICATION]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_NOTIFICATION]),
  Controller[CONTROLLERS.CREATE_NOTIFICATION]
);

router.put(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CLEAR_NOTIFICATIONS]),
  Controller[CONTROLLERS.CLEAR_NOTIFICATIONS]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_NOTIFICATION]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_NOTIFICATION]),

  Controller[CONTROLLERS.DELETE_NOTIFICATION]
);

export default router;
