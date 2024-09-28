import { USER_ROLES } from '../../common/helpers/constants.js';
import { CONTROLLERS } from './helpers/constant.js';

export default {
    [CONTROLLERS.SIGNUP]: {
        permissions: [USER_ROLES.OWNER , USER_ROLES.CLIENT],
        endpoint: '/signup'
    },
    [CONTROLLERS.LOGIN]: {
        permissions: [USER_ROLES.OWNER, USER_ROLES.CLIENT],
        endpoint: '/login'
    }
};