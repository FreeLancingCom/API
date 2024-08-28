import express from 'express';
import { CONTROLLER } from '../helpers/constant.js';
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
  Authorization.Authorize(Permissions[CONTROLLER.LIST_COUNTRIES]),
  validateRequest(validationSchemas[CONTROLLER.LIST_COUNTRIES]),
  Controller[CONTROLLER.LIST_COUNTRIES]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.COUNT_COUNTRIES]),
  Controller[CONTROLLER.COUNT_COUNTRIES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.GET_COUNTRY]),
  validateRequest(validationSchemas[CONTROLLER.GET_COUNTRY]),
  Controller[CONTROLLER.GET_COUNTRY]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.CREATE_COUNTRY]),
  validateRequest(validationSchemas[CONTROLLER.CREATE_COUNTRY]),
  Controller[CONTROLLER.CREATE_COUNTRY]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.UPDATE_COUNTRY]),
  validateRequest(validationSchemas[CONTROLLER.UPDATE_COUNTRY]),
  Controller[CONTROLLER.UPDATE_COUNTRY]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.DELETE_COUNTRY]),
  validateRequest(validationSchemas[CONTROLLER.DELETE_COUNTRY]),
  Controller[CONTROLLER.DELETE_COUNTRY]
);

export default router;
