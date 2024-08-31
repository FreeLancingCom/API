import { StatusCodes } from 'http-status-codes';
import ReviewModel from '../models/index.js';
// import bookingService from '../../bookings/services/bookingService.js';
import maintenanceCenterService from '../../maintenanceCenter/services/index.js';
import { reviewsErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

const { BAD_REQUEST, NOT_FOUND } = StatusCodes;
class ReviewService {
  async listReviews(user, userRole, query) {
    try {
      const { page, limit, skip, sortBy, sortOrder, ..._query } = query;

      const options = getPaginationAndSortingOptions(query);

      if (userRole === USER_ROLES.PROVIDER)
        _query.maintenanceCenterId = user.maintenanceCenterId
      if (userRole === USER_ROLES.CLIENT)
        _query.userId = user._id

      const reviews = await ReviewModel.find(_query, options);

      return { reviews, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getReview(reviewId) {
    try {
      const review = await ReviewModel.findOne({ _id: reviewId });

      if (!review) {
        throw new ErrorResponse(
          reviewsErrors.REVIEW_NOT_FOUND.message,
          BAD_REQUEST,
          reviewsErrors.REVIEW_NOT_FOUND.code
        );
      }

      return review;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createReview(userId, reviewData) {
    try {
      reviewData['userId'] = userId

      const booking = await bookingService.getBooking(reviewData['bookingId'])

      if (!booking) {
        throw new ErrorResponse(
          reviewsErrors.BOOKING_NOT_FOUND.message,
          NOT_FOUND,
          reviewsErrors.BOOKING_NOT_FOUND.code
        );
      }

      if (booking.status != 'completed') {
        throw new ErrorResponse(
          reviewsErrors.BOOKING_NOT_COMPLETED.message,
          BAD_REQUEST,
          reviewsErrors.BOOKING_NOT_COMPLETED.code
        );
      }

      reviewData['maintenanceCenterId'] = booking.maintenanceCenterId

      const review = await ReviewModel.create(reviewData)

      let { totalReviews, reviewsCount } = await maintenanceCenterService.getMaintenanceCenter(
        {},
        reviewData.maintenanceCenterId
      )

      reviewsCount++

      let averageReviews = {}

      Object.keys(totalReviews).forEach(field => {
        totalReviews[field] += reviewData[field];
        averageReviews[field] = totalReviews[field] / reviewsCount;
      });

      await maintenanceCenterService.updateMaintenanceCenter(
        {},
        reviewData.maintenanceCenterId,
        { totalReviews, averageReviews, reviewsCount }
      )

      return review;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateReview(userId, reviewId, reviewData) {
    try {
      const existingReview = await ReviewModel.findOne({ _id: reviewId, userId });

      if (!existingReview) {
        throw new ErrorResponse(
          reviewsErrors.REVIEW_NOT_FOUND.message,
          BAD_REQUEST,
          reviewsErrors.REVIEW_NOT_FOUND.code
        );
      }

      const review = await ReviewModel.update({ _id: reviewId }, reviewData)

      let { totalReviews, reviewsCount } = await maintenanceCenterService.getMaintenanceCenter(
        {},
        existingReview.maintenanceCenterId
      )

      let averageReviews = {}

      Object.keys(totalReviews).forEach(field => {
        totalReviews[field] += (reviewData[field] - existingReview[field]);
        averageReviews[field] = totalReviews[field] / reviewsCount;
      });

      await maintenanceCenterService.updateMaintenanceCenter(
        {},
        existingReview.maintenanceCenterId,
        { totalReviews, averageReviews }
      )

      return review;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteReview(userId, userRole, reviewId) {
    try {
      let selector = {
        _id: reviewId,
        userId
      }

      if (userRole === USER_ROLES.ADMIN)
        delete selector.userId

      const existingReview = await ReviewModel.findOne(selector);

      if (!existingReview) {
        throw new ErrorResponse(
          reviewsErrors.REVIEW_NOT_FOUND.message,
          BAD_REQUEST,
          reviewsErrors.REVIEW_NOT_FOUND.code
        );
      }

      const review = await ReviewModel.delete({ _id: reviewId })

      let { totalReviews, reviewsCount } = await maintenanceCenterService.getMaintenanceCenter(
        {},
        existingReview.maintenanceCenterId
      )

      reviewsCount--

      let averageReviews = {}

      Object.keys(totalReviews).forEach(field => {
        totalReviews[field] -= existingReview[field];
        averageReviews[field] = totalReviews[field] / reviewsCount;
      });

      await maintenanceCenterService.updateMaintenanceCenter(
        {},
        existingReview.maintenanceCenterId,
        { totalReviews, averageReviews, reviewsCount }
      )

      return review;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countReviews(user, userRole, query = {}, options) {
    try {
      if (userRole === USER_ROLES.PROVIDER)
        query.maintenanceCenterId = user.maintenanceCenterId
      if (userRole === USER_ROLES.CLIENT)
        query.userId = user._id

      return await ReviewModel.count(query);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new ReviewService();
