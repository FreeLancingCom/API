import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constant.js';

export default {
  [CONTROLLERS.DELETE_USER]: [USER_ROLES.OWNER],
  [CONTROLLERS.UPDATE_USER]: [USER_ROLES.OWNER],
  [CONTROLLERS.GET_USER]: [USER_ROLES.OWNER],
  [CONTROLLERS.LIST_USERS]: [USER_ROLES.OWNER]

};
