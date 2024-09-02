import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
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
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_COUPONS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_COUPONS]),
  Controller[CONTROLLERS.LIST_COUPONS]
);

router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_COUPONS]),
  Controller[CONTROLLERS.COUNT_COUPONS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_COUPON]),
  validateRequest(validationSchemas[CONTROLLERS.GET_COUPON]),
  Controller[CONTROLLERS.GET_COUPON]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_COUPON]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_COUPON]),
  Controller[CONTROLLERS.CREATE_COUPON]
);

router.post(
  '/apply',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.APPLY_COUPON]),
  validateRequest(validationSchemas[CONTROLLERS.APPLY_COUPON]),
  Controller[CONTROLLERS.APPLY_COUPON]
);
router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_COUPON]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_COUPON]),
  Controller[CONTROLLERS.UPDATE_COUPON]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_COUPON]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_COUPON]),
  Controller[CONTROLLERS.DELETE_COUPON]
);

export default router;
