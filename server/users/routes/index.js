import express from 'express';
import { CONTROLLERS } from '../helpers/constant.js';
import Controller from '../controller/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import validationSchemas from '../validations/index.js';

const router = express.Router();

// Authentication routes
router.post('/login', validateRequest(validationSchemas[CONTROLLERS.LOGIN]), Controller[CONTROLLERS.LOGIN]);
router.post('/signup', validateRequest(validationSchemas[CONTROLLERS.SIGNUP]), Controller[CONTROLLERS.SIGNUP]);
router.post('/refresh-token', Controller[CONTROLLERS.REFRESH_TOKEN]);
router.post('/verify-account', Controller[CONTROLLERS.VERIFY_EMAIL]);

// Password reset routes
router.post('/reset-password-link', Controller[CONTROLLERS.RESET_PASSWORD_CODE_TOKEN]); // Request password reset link
router.post('/reset-password', Controller[CONTROLLERS.VERIFY_TOKEN_AND_RESET_PASSWORD]); // Update password using the token

export default router;
