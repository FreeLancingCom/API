import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

router.get(
  '/',
  validateRequest(validationSchemas[CONTROLLERS.LIST_PRODUCTS]),
  Controller[CONTROLLERS.LIST_PRODUCTS]
);


router.get(
  '/:id',
  validateRequest(validationSchemas[CONTROLLERS.GET_PRODUCT]),
  Controller[CONTROLLERS.GET_PRODUCT]
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