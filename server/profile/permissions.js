import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constants.js';

export default {
  [CONTROLLERS.GET_PROFILE]: [USER_ROLES.ADMIN, USER_ROLES.USER ,USER_ROLES.PROVIDER ],
  [CONTROLLERS.UPDATE_PROFILE]: [USER_ROLES.ADMIN, USER_ROLES.USER ,USER_ROLES.PROVIDER]
};
