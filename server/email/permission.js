import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helper/constant.js';

export default {
  [CONTROLLERS.SEND_EMAIL]: [USER_ROLES.OWNER],
};