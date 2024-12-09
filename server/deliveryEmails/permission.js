import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constants.js';

export default {
  [CONTROLLERS.CREATE_DELIVERY_EMAIL]: [USER_ROLES.OWNER],
  [CONTROLLERS.LIST_DELIVERY_EMAILS]: [USER_ROLES.OWNER],
  [CONTROLLERS.GET_DELIVERY_EMAIL]: [USER_ROLES.OWNER],
  [CONTROLLERS.UPDATE_DELIVERY_EMAIL]: [USER_ROLES.OWNER],
  [CONTROLLERS.DELETE_DELIVERY_EMAIL]: [USER_ROLES.OWNER]
};