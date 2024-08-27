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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_ADMIN]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_ADMIN]),
  Controller[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_ADMIN]
);

router.get(
  '/provider',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_PROVIDER]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_PROVIDER]),
  Controller[CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_PROVIDER]
);

router.get(
  '/:serviceTemplateId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_SERVICE_TEMPLATE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_SERVICE_TEMPLATE]),
  Controller[CONTROLLERS.GET_SERVICE_TEMPLATE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_SERVICE_TEMPLATE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_SERVICE_TEMPLATE]),
  Controller[CONTROLLERS.CREATE_SERVICE_TEMPLATE]
);

router.put(
  '/admin/:serviceTemplateId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_ADMIN]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_ADMIN]),
  Controller[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_ADMIN]
);

router.put(
  '/provider/:serviceTemplateId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_PROVIDER]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_PROVIDER]),
  Controller[CONTROLLERS.UPDATE_SERVICE_TEMPLATE_PROVIDER]
);

router.delete(
  '/:serviceTemplateId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_SERVICE_TEMPLATES]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_SERVICE_TEMPLATES]),
  Controller[CONTROLLERS.DELETE_SERVICE_TEMPLATES]
);

router.post(
  '/provider/request',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.REQUEST_SERVICE_TEMPLATE]),
  validateRequest(validationSchemas[CONTROLLERS.REQUEST_SERVICE_TEMPLATE]),
  Controller[CONTROLLERS.REQUEST_SERVICE_TEMPLATE]
);

router.post(
  '/provider/clone/:serviceTemplateId',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CLONE_SERVICE_TEMPLATE_FOR_PROVIDER]),
  validateRequest(validationSchemas[CONTROLLERS.CLONE_SERVICE_TEMPLATE_FOR_PROVIDER]),
  Controller[CONTROLLERS.CLONE_SERVICE_TEMPLATE_FOR_PROVIDER]
);

export default router;
