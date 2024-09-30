export const CONTROLLERS = {
  // AUTH
  LOGIN: 'login',
  SIGNUP: 'register',
  // USER
  GENERATE_EMAIL_VERIFICATION_TOKEN: 'generateEmailVerificationToken',
  RESET_PASSWORD_CODE_TOKEN: 'reset password code token',
  //ADMIN
  LIST_USERS: 'listUsers',
  GET_USER: 'getUser',
  UPDATE_USER: 'updateUser',
  DELETE_USER: 'deleteUser',
  // oAuth
  VERIFY_EMAIL: 'verifyEmail',
  RESET_PASSWORD_CODE_TOKEN: 'RESET_PASSWORD_CODE_TOKEN',
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_AND_RESET_PASSWORD: 'VERIFY_TOKEN_AND_RESET_PASSWORD',

  // TOKEN REFRESH
  REFRESH_TOKEN: 'refresh_token',

  // AUTH Using email
  GENERATE_VERIFY_ACCOUNT_LINK: 'generateVieriifiyAccountLink'
};
export const usersErrors = Object.freeze({
  USER_NOT_FOUND: {
    code: 100,
    message: 'User not found'
  },
  USER_ALREADY_EXISTS: {
    code: 101,
    message: 'User already exists'
  },
  INVALID_CREDENTIALS: {
    code: 102,
    message: 'Invalid credentials'
  },
  INVALID_PHONE_NUMBER: {
    code: 103,
    message: 'Invalid phone number'
  },
  USER_CREATION_FAILED: {
    code: 104,
    message: 'User creation failed'
  },
  WRONG_VERIFICATION_CODE: {
    code: 105,
    message: 'Wrong Verification Code'
  },
  VERIFICATION_CODE_EXPIRED: {
    code: 106,
    message: 'Code expired please request another one.'
  },
  REQUEST_VERIFICATION_CODE: {
    code: 107,
    message: 'Please request a code first.'
  },
  WRONG_RESET_PASSWORD_CODE: {
    code: 108,
    message: 'Wrong Reset Password Code'
  },
  COUNTRY_NOT_FOUND: {
    code: 109,
    message: 'Country not found.'
  }
});

export const projectionForUnNeededFields = {
  isVerified: 0,
  resetPasswordToken: 0,
  verifyPasswordToken: 0
};
export const passwordProjection = {
  password: 0,
  __v: 0
};
