export const CONTROLLERS = {
  LIST_COUPONS: 'admin_coupons:list',
  GET_COUPON: 'admin_coupons:get',
  CREATE_COUPON: 'admin_coupons:create',
  UPDATE_COUPON: 'admin_coupons:update',
  DELETE_COUPON: 'admin_coupons:delete',
  COUNT_COUPONS: 'admin_coupons:count',
  APPLY_COUPON: 'admin_coupons:apply'
};

export const couponError = Object.freeze({
  COUPON_NOT_FOUND: {
    code: 201,
    message: 'Coupon not found'
  },
  COUPON_ALREADY_EXISTS: {
    code: 202,
    message: 'Coupon already exists'
  },
  COUPON_CREATION_FAILED: {
    code: 203,
    message: 'Coupon creation failed'
  },
  COUPON_UPDATE_FAILED: {
    code: 204,
    message: 'Coupon update failed'
  },
  COUPON_DELETE_FAILED: {
    code: 205,
    message: 'Coupon delete failed'
  },
  INVALID_DUE_DATE: {
    code: 206,
    message: 'Invalid due date'
  },
  COUPON_EXPIRED: {
    code: 207,
    message: 'Coupon expired'
  }
});
