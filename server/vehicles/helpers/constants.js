export const CONTROLLERS = {
  LIST_VEHICLES: 'vehicle:list',
  GET_VEHICLE: 'vehicle:get',
  CREATE_VEHICLE: 'vehicle:create',
  UPDATE_VEHICLE: 'vehicle:update',
  DELETE_VEHICLE: 'vehicle:delete',
  COUNT_VEHICLES:'vehicle:count'
};

export const vehcileErrors = Object.freeze({
  VEHICLE_NOT_FOUND: {
    code: 100,
    message: 'Vehicle not found'
  },
  VEHICLE_ALREADY_EXISTS: {
    code: 101,
    message: 'Vehicle already exists'
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
  }
});
const AUTO = 'AUTO';
const MANUAL = 'MANUAL';

export const GEAR_SHIFT_TYPE = {
  AUTO,
  MANUAL
};


const PETROL = 'PETROL';
const DIESEL = 'DIESEL';
const ELECTRIC = 'ELECTRIC';
const HYPIRD = 'HYPIRD';

export const ENGINE_TYPE = {
  PETROL,
  DIESEL,
  ELECTRIC,
  HYPIRD
};