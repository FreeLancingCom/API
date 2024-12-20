import { CONTROLLERS } from './helpers/constants.js';
import { USER_ROLES } from '../../common/helpers/constants.js';

export default {
  [CONTROLLERS.LIST_ORDERS]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.GET_ORDER]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.CREATE_ORDER]: [USER_ROLES.CLIENT],
  [CONTROLLERS.UPDATE_ORDER]: [USER_ROLES.OWNER],
  [CONTROLLERS.DELETE_ORDER]: [USER_ROLES.OWNER],
  [CONTROLLERS.REFUND_ORDER]: [USER_ROLES.OWNER],
  [CONTROLLERS.SEND_ORDER_EMAIL]: [USER_ROLES.OWNER],
};
