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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_CLIENT_VEHICLES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_CLIENT_VEHICLES]),
  Controller[CONTROLLERS.LIST_CLIENT_VEHICLES]
);
router.get(
  '/admin',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.ADMIN_LIST_VEHICLES]),
  validateRequest(validationSchemas[CONTROLLERS.ADMIN_LIST_VEHICLES]),
  Controller[CONTROLLERS.ADMIN_LIST_VEHICLES]
);
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_VEHICLES]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_VEHICLES]),
  Controller[CONTROLLERS.COUNT_VEHICLES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_VEHICLE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_VEHICLE]),
  Controller[CONTROLLERS.GET_VEHICLE]
);

router.post(
  '/create',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_VEHICLE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_VEHICLE]),
  Controller[CONTROLLERS.CREATE_VEHICLE]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_VEHICLE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_VEHICLE]),
  Controller[CONTROLLERS.UPDATE_VEHICLE]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_VEHICLE]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_VEHICLE]),
  Controller[CONTROLLERS.DELETE_VEHICLE]
);


export default router;
