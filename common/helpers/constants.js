export const errorCodes = Object.freeze({
  USER_NOT_AUTHORIZED: {
    message: 'User not authorized',
    code: 1
  },
  INVALID_TOKEN: {
    message: 'Invalid token',
    code: 2
  },
  VERIFY_YOUR_EMAIL: {
    message: 'Please verify your email first.',
    code: 3
  },
  USER_NOT_FOUND : {
    message: 'User not found',
    code: 4
  },
  INVALID_REFRESH_TOKEN : {
    message: 'Invalid refresh token',
    code: 5
  }
});
const OWNER = 'OWNER';
const CLIENT = 'CLIENT';



export const USER_ROLES = {
  OWNER,
  CLIENT,
};


