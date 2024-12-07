import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constants.js';

export default {
  [CONTROLLERS.CREATE_SLIDER]: [USER_ROLES.OWNER],
    [CONTROLLERS.LIST_SLIDERS]: [USER_ROLES.OWNER , USER_ROLES.CLIENT],
    [CONTROLLERS.GET_SLIDER]: [USER_ROLES.OWNER , USER_ROLES.CLIENT],
    [CONTROLLERS.UPDATE_SLIDER]: [USER_ROLES.OWNER],
    [CONTROLLERS.DELETE_SLIDER]: [USER_ROLES.OWNER]
};