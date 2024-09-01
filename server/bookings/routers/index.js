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
  '/client',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CLIENT_LIST_BOOKINGS]),
  validateRequest(validationSchemas[CONTROLLERS.CLIENT_LIST_BOOKINGS]),
  Controller[CONTROLLERS.CLIENT_LIST_BOOKINGS]
);

router.get(
  '/provider',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.Provider_LIST_BOOKINGS]),
  validateRequest(validationSchemas[CONTROLLERS.Provider_LIST_BOOKINGS]),
  Controller[CONTROLLERS.Provider_LIST_BOOKINGS]
);
router.get(
  '/admin',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.ADMIN_LIST_BOOKINGS]),
  validateRequest(validationSchemas[CONTROLLERS.ADMIN_LIST_BOOKINGS]),
  Controller[CONTROLLERS.ADMIN_LIST_BOOKINGS]
);
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_BOOKINGS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_BOOKINGS]),
  Controller[CONTROLLERS.COUNT_BOOKINGS]
);

router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.GET_BOOKING]),
  Controller[CONTROLLERS.GET_BOOKING]
);

router.post(
  '/create',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_BOOKING]),
  Controller[CONTROLLERS.CREATE_BOOKING]
);

router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_BOOKING]),
  Controller[CONTROLLERS.UPDATE_BOOKING]
);

router.put(
  '/:id/approve',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.APPROVE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.APPROVE_BOOKING]),
  Controller[CONTROLLERS.APPROVE_BOOKING]
);
router.put(
  '/:id/decline',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DECLINE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.DECLINE_BOOKING]),
  Controller[CONTROLLERS.DECLINE_BOOKING]
);
router.put(
  '/:id/complete',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COMPLETE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.COMPLETE_BOOKING]),
  Controller[CONTROLLERS.COMPLETE_BOOKING]
);
router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_BOOKING]),
  validateRequest(validationSchemas[CONTROLLERS.DELETE_BOOKING]),
  Controller[CONTROLLERS.DELETE_BOOKING]
);


export default router;
