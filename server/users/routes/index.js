import express from 'express';
import { CONTROLLERS } from '../helpers/constant.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();


router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_USERS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_USERS]),
  Controller[CONTROLLERS.LIST_USERS]
);


router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_USER]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_USER]),
  Controller[CONTROLLERS.GET_USER]
);

//UPDATE USER
router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_USER]),
  Controller[CONTROLLERS.UPDATE_USER]
);

//DELETE USER
router.delete(
  '/:id',
  Authenticate, 
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_USER]),
  Controller[CONTROLLERS.DELETE_USER]
);

// Authentication routes
router.post(
  '/login',
  validateRequest(validationSchemas[CONTROLLERS.LOGIN]),
  Controller[CONTROLLERS.LOGIN]
);
router.post(
  '/signup',
  validateRequest(validationSchemas[CONTROLLERS.SIGNUP]),
  Controller[CONTROLLERS.SIGNUP]
);
router.post('/refresh-token', Controller[CONTROLLERS.REFRESH_TOKEN]);
router.post('/verify-account', Controller[CONTROLLERS.VERIFY_EMAIL]);

// Password reset routes
router.post('/reset-password-link', Controller[CONTROLLERS.RESET_PASSWORD_CODE_TOKEN]); // Request password reset link
router.post('/reset-password', Controller[CONTROLLERS.VERIFY_TOKEN_AND_RESET_PASSWORD]); // Update password using the token


export default router;
