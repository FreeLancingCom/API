import { CONTROLLERS } from './helpers/constants.js';
import { USER_ROLES } from '../../common/helpers/constants.js';

export const PERMISSIONS = {
  [CONTROLLERS.LIST_SERVICES_TYPES]: [USER_ROLES.ADMIN, USER_ROLES.CLIENT, USER_ROLES.PROVIDER],
  [CONTROLLERS.GET_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.CREATE_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.UPDATE_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.DELETE_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.APPROVE_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.DECLINE_SERVICE_TYPE]: [USER_ROLES.ADMIN],
  [CONTROLLERS.REQUEST_SERVICE_TYPE]: [USER_ROLES.PROVIDER],
  [CONTROLLERS.COUNT_SERVICE_TYPES]: [USER_ROLES.ADMIN, USER_ROLES.CLIENT, USER_ROLES.PROVIDER]
};