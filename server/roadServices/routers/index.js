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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_ROAD_SERVICES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_ROAD_SERVICES]),
  Controller[CONTROLLERS.LIST_ROAD_SERVICES]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_ROAD_SERVICES]),
  Controller[CONTROLLERS.COUNT_ROAD_SERVICES]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_ROAD_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_ROAD_SERVICE]),
  Controller[CONTROLLERS.GET_ROAD_SERVICE]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_ROAD_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_ROAD_SERVICE]),
  Controller[CONTROLLERS.CREATE_ROAD_SERVICE]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_ROAD_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_ROAD_SERVICE]),
  Controller[CONTROLLERS.UPDATE_ROAD_SERVICE]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_ROAD_SERVICE]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_ROAD_SERVICE]),
  Controller[CONTROLLERS.DELETE_ROAD_SERVICE]
);

export default router;
