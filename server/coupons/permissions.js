import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constants.js';

export default {
  [CONTROLLERS.GET_COUPON]: [USER_ROLES.OWNER],
  [CONTROLLERS.LIST_COUPONS]: [USER_ROLES.OWNER],
  [CONTROLLERS.CREATE_COUPON]: [USER_ROLES.OWNER],
  [CONTROLLERS.UPDATE_COUPON]: [USER_ROLES.OWNER],
  [CONTROLLERS.DELETE_COUPON]: [USER_ROLES.OWNER],
  [CONTROLLERS.APPLY_COUPON]: [USER_ROLES.CLIENT]
};
