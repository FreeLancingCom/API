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
  }
});
const OWNER = 'OWNER';
const CLIENT = 'CLIENT';


export const USER_ROLES = {
  OWNER,
  CLIENT,
};


