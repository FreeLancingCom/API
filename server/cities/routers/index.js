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
  Authorization.Authorize(Permissions[CONTROLLER.LIST_CITIES]),
  validateRequest(validationSchemas[CONTROLLER.LIST_CITIES]),
  Controller[CONTROLLER.LIST_CITIES]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.COUNT_CITIES]),
  validateRequest(validationSchemas[CONTROLLER.COUNT_CITIES]),
  Controller[CONTROLLER.COUNT_CITIES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.GET_CITY]),
  validateRequest(validationSchemas[CONTROLLER.GET_CITY]),
  Controller[CONTROLLER.GET_CITY]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.CREATE_CITY]),
  validateRequest(validationSchemas[CONTROLLER.CREATE_CITY]),
  Controller[CONTROLLER.CREATE_CITY]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.UPDATE_CITY]),
  validateRequest(validationSchemas[CONTROLLER.UPDATE_CITY]),
  Controller[CONTROLLER.UPDATE_CITY]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLER.DELETE_CITY]),
  validateRequest(validationSchemas[CONTROLLER.DELETE_CITY]),
  Controller[CONTROLLER.DELETE_CITY]
);

export default router;
