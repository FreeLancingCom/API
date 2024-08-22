import express from 'express';
import { CONTROLLERS } from '../helper/constant.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();

router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_ADDRESSES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_ADDRESSES]),
  Controller[CONTROLLERS.LIST_ADDRESSES]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_ADDRESSES]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_ADDRESSES]),
  Controller[CONTROLLERS.COUNT_ADDRESSES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_ADDRESS]),
  validateRequest(validationSchemas[CONTROLLERS.GET_ADDRESS]),
  Controller[CONTROLLERS.GET_ADDRESS]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_ADDRESS]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_ADDRESS]),
  Controller[CONTROLLERS.CREATE_ADDRESS]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_ADDRESS]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_ADDRESS]),
  Controller[CONTROLLERS.UPDATE_ADDRESS]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_ADDRESS]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_ADDRESS]),
  Controller[CONTROLLERS.DELETE_ADDRESS]
);

export default router;
