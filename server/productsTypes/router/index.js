import express from 'express';
const router = express.Router();
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import { PERMISSIONS } from '../permission.js';
import { CONTROLLERS } from '../helper/constants.js';
import controller from '../controller/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';

router.get(
  '/',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.LIST_PRODUCTS_TYPES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_PRODUCTS_TYPES]),
  controller[CONTROLLERS.LIST_PRODUCTS_TYPES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.GET_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_PRODUCT_TYPE]),
  controller[CONTROLLERS.GET_PRODUCT_TYPE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.CREATE_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_PRODUCT_TYPE]),
  controller[CONTROLLERS.CREATE_PRODUCT_TYPE]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.UPDATE_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_PRODUCT_TYPE]),
  controller[CONTROLLERS.UPDATE_PRODUCT_TYPE]
);

router.put(
  '/approve/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.APPROVE_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.APPROVE_PRODUCT_TYPE]),
  controller[CONTROLLERS.APPROVE_PRODUCT_TYPE]
);

router.put(
  '/decline/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.DECLINE_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.DECLINE_PRODUCT_TYPE]),
  controller[CONTROLLERS.DECLINE_PRODUCT_TYPE]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.DELETE_PRODUCT_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_PRODUCT_TYPE]),
  controller[CONTROLLERS.DELETE_PRODUCT_TYPE]
);

export default router;
