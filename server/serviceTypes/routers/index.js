import express from 'express';
const router = express.Router();
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import { PERMISSIONS } from '../permission.js';
import { CONTROLLERS } from '../helpers/constants.js';
import controller from '../controllers/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';

router.get(
  '/',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.LIST_SERVICES_TYPES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_SERVICES_TYPES]),
  controller[CONTROLLERS.LIST_SERVICES_TYPES]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.COUNT_SERVICE_TYPES]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_SERVICE_TYPES]),
  controller[CONTROLLERS.COUNT_SERVICE_TYPES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.GET_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_SERVICE_TYPE]),
  controller[CONTROLLERS.GET_SERVICE_TYPE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.CREATE_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_SERVICE_TYPE]),
  controller[CONTROLLERS.CREATE_SERVICE_TYPE]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.UPDATE_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_SERVICE_TYPE]),
  controller[CONTROLLERS.UPDATE_SERVICE_TYPE]
);

router.put(
  '/approve/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.APPROVE_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.APPROVE_SERVICE_TYPE]),
  controller[CONTROLLERS.APPROVE_SERVICE_TYPE]
);

router.put(
  '/decline/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.DECLINE_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.DECLINE_SERVICE_TYPE]),
  controller[CONTROLLERS.DECLINE_SERVICE_TYPE]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.DELETE_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_SERVICE_TYPE]),
  controller[CONTROLLERS.DELETE_SERVICE_TYPE]
);

router.post(
  '/request',
  Authenticate,
  Authorization.Authorize(PERMISSIONS[CONTROLLERS.REQUEST_SERVICE_TYPE]),
  validateRequest(validationSchemas[CONTROLLERS.REQUEST_SERVICE_TYPE]),
  controller[CONTROLLERS.REQUEST_SERVICE_TYPE]
);

export default router;
