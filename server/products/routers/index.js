import express from 'express';
import { CONTROLLERS } from '../helper/constants.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_PRODUCTS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_PRODUCTS]),
  Controller[CONTROLLERS.LIST_PRODUCTS]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_PRODUCTS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_PRODUCTS]),
  Controller[CONTROLLERS.COUNT_PRODUCTS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_PRODUCT]),
  validateRequest(validationSchemas[CONTROLLERS.GET_PRODUCT]),
  Controller[CONTROLLERS.GET_PRODUCT]
);

router.get(
  '/maintenance-center/:mcId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_MAINTENANCE_CENTER_PRODUCTS]),
  Controller[CONTROLLERS.LIST_MAINTENANCE_CENTER_PRODUCTS]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_PRODUCT]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_PRODUCT]),
  Controller[CONTROLLERS.CREATE_PRODUCT]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_PRODUCT]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_PRODUCT]),
  Controller[CONTROLLERS.UPDATE_PRODUCT]
);
router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_PRODUCT]),
  Controller[CONTROLLERS.DELETE_PRODUCT]
);

export default router;
