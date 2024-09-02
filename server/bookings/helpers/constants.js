export const CONTROLLERS = {
  CLIENT_LIST_BOOKINGS: 'booking:clinetList',
  Provider_LIST_BOOKINGS: 'booking:providerList',
  GET_BOOKING: 'booking:get',
  CREATE_BOOKING: 'booking:create',
  UPDATE_BOOKING: 'booking:Update',
  RESCHEDULE_BOOKING: 'booking:reschedule',
  APPROVE_CLIENT_BOOKING: 'booking:clientApprove',
  APPROVE_PROVIDER_BOOKING: 'booking:providerApprove',
  COMPLETE_BOOKING: 'booking:complete',
  DECLINE_CLIENT_BOOKING: 'booking:clientDecline',
  DECLINE_PROVIDER_BOOKING: 'booking:providerDecline',
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
  BOOKING_IS_ALREADY_APPROVED: {
    code: 107,
    message: 'booking is already approved'
  },
  BOOKING_IS_NOT_PENDING: {
    code: 108,
    message: 'booking is not pending'
  },
  BOOKING_IS_ALREADY_DECLINED: {
    code: 108,
    message: 'booking is already declined'
  },
  BOOKING_IS_ALREADY_COMPLETED: {
    code: 109,
    message: 'booking is already completed'
  },
  SERVICE_NOT_FOUND:{
   code: 110,
    message: 'service not found'
  },
  PRODUCT_NOT_FOUND:{
   code: 111,
    message: 'product is already completed'
  },
  UNVALID_RESCHEDULE:{
    code: 112,
     message: 'unvalid reschedule'
   },
  }
);
const PENDING = 'PENDING';
const APPROVED = 'APPROVED';
const DECLINED = 'DECLINED';
const COMPELETED = 'COMPELETED';
const RESCHEDULED = 'RESCHEDULED';

export const BOOKING_STATUS = {
  PENDING,
  APPROVED,
  DECLINED,
  COMPELETED,
  RESCHEDULED
};
