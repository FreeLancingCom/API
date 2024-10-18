import express from 'express';
import { CONTROLLERS } from '../helper/constant.js';
import Controller from '../controller/index.js';
import validationSchemas from '../validation/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permission.js';

const router = express.Router();


router.get(
  '/:id',
  validateRequest(validationSchemas[CONTROLLERS.LIST_COMMENTS]),
  Controller[CONTROLLERS.LIST_COMMENTS]
);

router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.ADD_COMMENT]),
  validateRequest(validationSchemas[CONTROLLERS.ADD_COMMENT]),
  Controller[CONTROLLERS.ADD_COMMENT]
);


export default router;
