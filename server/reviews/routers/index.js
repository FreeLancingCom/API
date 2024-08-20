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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_REVIEWS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_REVIEWS]),
  Controller[CONTROLLERS.LIST_REVIEWS]
);
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_REVIEWS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_REVIEWS]),
  Controller[CONTROLLERS.COUNT_REVIEWS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_REVIEW]),
  validateRequest(validationSchemas[CONTROLLERS.GET_REVIEW]),
  Controller[CONTROLLERS.GET_REVIEW]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_REVIEW]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_REVIEW]),
  Controller[CONTROLLERS.CREATE_REVIEW]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_REVIEW]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_REVIEW]),
  Controller[CONTROLLERS.UPDATE_REVIEW]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_REVIEW]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_REVIEW]),
  Controller[CONTROLLERS.DELETE_REVIEW]
);

export default router;
