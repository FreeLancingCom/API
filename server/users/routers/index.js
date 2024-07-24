import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

// router.get(
//   '/generate-code',
//   Authenticate,
//   Authorization.Authorize(
//     Permissions[CONTROLLERS.GENERATE_EMAIL_VERIFICATION_CODE],
//     CONTROLLERS.GENERATE_EMAIL_VERIFICATION_CODE
//   ),
//   Controller[CONTROLLERS.GENERATE_EMAIL_VERIFICATION_CODE]
// );

// router.post(
//   '/verify-email',
//   Authenticate,
//   Authorization.Authorize(Permissions[CONTROLLERS.VERIFY_EMAIL], CONTROLLERS.VERIFY_EMAIL),
//   validateRequest(validationSchemas[CONTROLLERS.VERIFY_EMAIL]),
//   Controller[CONTROLLERS.VERIFY_EMAIL]
// );

// router.post(
//   '/reset-password',
//   validateRequest(validationSchemas[CONTROLLERS.RESET_PASSWORD]),
//   Controller[CONTROLLERS.RESET_PASSWORD]
// );

// router.post(
//   '/verify-reset-password',
//   validateRequest(validationSchemas[CONTROLLERS.RESET_PASSWORD_CODE_VERIFICATION]),
//   Controller[CONTROLLERS.RESET_PASSWORD_CODE_VERIFICATION]
// );

// CRUD

router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_USERS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_USERS]),
  Controller[CONTROLLERS.LIST_USERS]
);
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_USERS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_USERS]),
  Controller[CONTROLLERS.COUNT_USERS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_USER]),
  validateRequest(validationSchemas[CONTROLLERS.GET_USER]),
  Controller[CONTROLLERS.GET_USER]
);

router.post(
  '/create',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_USER]),
  Controller[CONTROLLERS.CREATE_USER]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_USER]),
  Controller[CONTROLLERS.UPDATE_USER]
);

router.put(
  '/:id/deactivate',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DEACTIVATE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.DEACTIVATE_USER]),
  Controller[CONTROLLERS.DEACTIVATE_USER]
);

router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_USER]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_USER]),
  Controller[CONTROLLERS.DELETE_USER]
);

// Admin Login
router.post(
  '/admin/login',
  validateRequest(validationSchemas[CONTROLLERS.ADMIN_LOGIN]),
  Controller[CONTROLLERS.ADMIN_LOGIN]
);

// User Login and Signup
router.post(
  '/login',
  validateRequest(validationSchemas[CONTROLLERS.USER_LOGIN]),
  Controller[CONTROLLERS.USER_LOGIN]
);

router.post(
  '/signup',
  validateRequest(validationSchemas[CONTROLLERS.SIGNUP]),
  Controller[CONTROLLERS.SIGNUP]
);

export default router;
