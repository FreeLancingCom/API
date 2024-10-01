import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helper/constant.js';

export default {
  [CONTROLLERS.GET_PROFILE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
  [CONTROLLERS.UPDATE_PROFILE]: [USER_ROLES.OWNER, USER_ROLES.CLIENT]
};
