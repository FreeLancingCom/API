import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constants.js';

export default {
  [CONTROLLERS.LIST_PACKAGES]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.GET_PACKAGE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.CREATE_PACKAGE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.UPDATE_PACKAGE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.DELETE_PACKAGE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT]
};