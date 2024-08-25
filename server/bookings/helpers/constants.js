export const CONTROLLERS = {
  CLIENT_LIST_BOOKINGS: 'booking:clinetList',
  Provider_LIST_BOOKINGS: 'booking:providerList',
  GET_BOOKING: 'booking:get',
  CREATE_BOOKING: 'booking:create',
  UPDATE_BOOKING: 'booking:update',
  APPROVE_BOOKING: 'booking:approve',
  DECLINE_BOOKING: 'booking:decline',
  DELETE_BOOKING: 'booking:delete',
  COUNT_BOOKINGS:'booking:count',
  ADMIN_LIST_BOOKINGS:'booking:adminList'
};

export const bookingErrors = Object.freeze({
  BOOKING_NOT_FOUND: {
    code: 100,
    message: 'Booking not found'
  },
  BOOKING_ALREADY_EXISTS: {
    code: 101,
    message: 'Booking already exists'
  },
  USER_NOT_FOUND: {
    code: 102,
    message: 'User not found'
  },
  PROVIDER_NOT_FOUND: {
    code: 103,
    message: 'Provider not found'
  },
  INVALID_USER: {
    code: 104,
    message: 'Invalid User'
  },
  INVALID_BOOKING_Time: {
    code: 105,
    message: 'Invalid booking time'
  },
  VEHICLE_NOT_FOUND: {
    code: 106,
    message: 'vehicle not found'
  },
  }
);
const PENDING = 'PENDING';
const APPROVED = 'APPROVED';
const DECLINED = 'DECLINED';
const COMPELETED = 'COMPELETED';

export const BOOKING_STATUS = {
  PENDING,
  APPROVED,
  DECLINED,
  COMPELETED
};
