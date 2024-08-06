export const CONTROLLERS = {
  LIST_CLIENT_VEHICLES: 'vehicle:list',
  GET_VEHICLE: 'vehicle:get',
  CREATE_VEHICLE: 'vehicle:create',
  UPDATE_VEHICLE: 'vehicle:update',
  DELETE_VEHICLE: 'vehicle:delete',
  COUNT_VEHICLES:'vehicle:count',
  ADMIN_LIST_VEHICLES:'vehicle:adminList'
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
  USER_NOT_FOUND: {
    code: 102,
    message: 'User not found'
  },
  USER_NOT_OWNER: {
    code: 103,
    message: 'User not owner'
  }
  }
);
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