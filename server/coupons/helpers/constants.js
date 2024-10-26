export const CONTROLLERS = {
  LIST_COUPONS: 'LIST_COUPONS',
  GET_COUPON: 'GET_COUPON',
  CREATE_COUPON: 'CREATE_COUPON',
  UPDATE_COUPON: 'UPDATE_COUPON',
  DELETE_COUPON: 'DELETE_COUPON',
  APPLY_COUPON: 'APPLY_COUPON'
};

export const COUPON_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED: 'FIXED'
};

export const COUPON_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const couponsErrors = {
  COUPON_NOT_FOUND: {
    message: 'Coupon not found',
    code: 101
  },
  COUPON_ALREADY_EXISTS: {
    message: 'Coupon already exists',
    code: 102
  },
  INVALID_COUPON_TYPE: {
    message: 'Invalid coupon type',
    code: 103
  },
  INVALID_COUPON_STATUS: {
    message: 'Invalid coupon status',
    code: 104
  },
  INVALID_COUPON_CODE: {
    message: 'Invalid coupon code',
    code: 105
  },
  INVALID_COUPON_DISCOUNT: {
    message: 'Invalid coupon discount',
    code: 106
  },
  INVALID_COUPON_EXPIRY_DATE: {
    message: 'Invalid coupon expiry date',
    code: 107
  },
  COUPON_ALREADY_EXIST_AND_NOT_EXPIRED: {
    message: 'Coupon already exists and has not expired',
    code: 108
  },
  COUPON_ALREADY_APPLIED:{
    message: 'Coupon already applied',
    code: 109

  }
};
