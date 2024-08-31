export const CONTROLLERS = {
  LIST_REVIEWS: 'review:list',
  GET_REVIEW: 'review:get',
  CREATE_REVIEW: 'review:create',
  UPDATE_REVIEW: 'review:update',
  DELETE_REVIEW: 'review:delete',
  COUNT_REVIEWS: 'review:count',
};

export const reviewsErrors = Object.freeze({
  BOOKING_NOT_FOUND: {
    code: 100,
    message: 'Booking not found'
  },
  BOOKING_NOT_COMPLETED: {
    code: 101,
    message: 'Booking not completed'
  },
  REVIEW_NOT_FOUND: {
    code: 102,
    message: 'Review not found'
  },
});
