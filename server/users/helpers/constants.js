export const CONTROLLERS = {
  // All users
  LIST_USERS: 'admin:list',
  GET_USER: 'admin:get',
  CREATE_USER: 'admin:create',
  UPDATE_USER: 'admin:update',
  DELETE_USER: 'admin:delete',
  COUNT_USERS: 'admin:countUsers',
  DEACTIVATE_USER: 'admin:deactivate',
  GENERATE_EMAIL_VERIFICATION_CODE: 'users:generateEmailVerificationCode',
  RESET_PASSWORD_CODE_VERIFICATION: 'users:resetPasswordCodeVerification',
  VERIFY_EMAIL: 'users:verifyEmail',
  RESET_PASSWORD: 'users:resetPassword',
  SIGNUP: 'users:signup',
  USER_LOGIN: 'users:login',
  ADMIN_LOGIN: 'admin:login',
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

export const usersProjection = {
  verificationCode: 0,
  verificationCodeTTL: 0,
  resetPasswordCode: 0,
  resetPasswordCodeTTL: 0,
};

export const passwordProjection = {
  password: 0,
  __v: 0,
};

export const ALLOWED_ENDPOINTS_FOR_UNVERIFIED_USERS = [
  CONTROLLERS.GENERATE_EMAIL_VERIFICATION_CODE,
  CONTROLLERS.VERIFY_EMAIL
];
