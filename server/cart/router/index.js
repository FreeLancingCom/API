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
  validateRequest(validationSchemas[CONTROLLERS.LIST_CART]),
  Controller[CONTROLLERS.LIST_CART]
);

router.post(
  '/add-product/:id',
  validateRequest(validationSchemas[CONTROLLERS.CREATE_CART_PRODUCT]),
  Controller[CONTROLLERS.CREATE_CART_PRODUCT]
);

router.post(
  '/add-package/:id',
  validateRequest(validationSchemas[CONTROLLERS.CREATE_CART_PACKAGE]),
  Controller[CONTROLLERS.CREATE_CART_PACKAGE]
);


// remove product from the cart
router.delete(
  '/remove-product/:id',
  validateRequest(validationSchemas[CONTROLLERS.REMOVE_PRODUCT_FROM_CART]),
  Controller[CONTROLLERS.REMOVE_PRODUCT_FROM_CART]
);


router.delete(
  '/remove-package/:id',
  validateRequest(validationSchemas[CONTROLLERS.REMOVE_PACKAGE_FROM_CART]),
  Controller[CONTROLLERS.REMOVE_PACKAGE_FROM_CART]
);

// update product in the cart
router.put(
  '/update-product/:id',
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_CART_PRODUCT]),
  Controller[CONTROLLERS.UPDATE_CART_PRODUCT]
);


router.put(
  '/update-package/:id',
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_CART_PACKAGE]),
  Controller[CONTROLLERS.UPDATE_CART_PACKAGE]
);

// apply coupon
router.post(
  '/apply-coupon',
  validateRequest(validationSchemas[CONTROLLERS.APPLY_COUPON]),
  Controller[CONTROLLERS.APPLY_COUPON]
);

// checkout
router.post(
  '/checkout',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CHECK_OUT]),
  validateRequest(validationSchemas[CONTROLLERS.CHECK_OUT]),
  Controller[CONTROLLERS.CHECK_OUT]
);


export default router;
