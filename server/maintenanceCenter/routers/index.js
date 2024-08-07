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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_MAINTENANCE_CENTERS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_MAINTENANCE_CENTERS]),
  Controller[CONTROLLERS.LIST_MAINTENANCE_CENTERS]
);

router.get(
  '/:centerId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_MAINTENANCE_CENTER]),
  validateRequest(validationSchemas[CONTROLLERS.GET_MAINTENANCE_CENTER]),
  Controller[CONTROLLERS.GET_MAINTENANCE_CENTER]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_MAINTENANCE_CENTER]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_MAINTENANCE_CENTER]),
  Controller[CONTROLLERS.CREATE_MAINTENANCE_CENTER]
);

router.put(
  '/:centerId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_MAINTENANCE_CENTER]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_MAINTENANCE_CENTER]),
  Controller[CONTROLLERS.UPDATE_MAINTENANCE_CENTER]
);

router.delete(
  '/:centerId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_MAINTENANCE_CENTERS]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_MAINTENANCE_CENTERS]),
  Controller[CONTROLLERS.DELETE_MAINTENANCE_CENTERS]
);

export default router;
