import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import BookingModel from '../models/index.js';
import { BOOKING_STATUS, bookingErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import usersService from '../../users/services/usersService.js';
import MaintenanceCenterModel from '../../maintenanceCenter/models/index.js';
const { BAD_REQUEST } = StatusCodes;
import moment from 'moment'; 
import VehicleModel from '../../vehicles/models/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

class BookingService {
  async clientListBookings(user,query) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;
      _query.clientId = userId;

      const options = getPaginationAndSortingOptions(query);
      
      const bookings = await BookingModel.find(_query, options);

      return { bookings, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async providerListBookings(user,query) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;
      _query.providerId = userId;

      const options = getPaginationAndSortingOptions(query);
      
      const bookings = await BookingModel.find(_query, options);

      return { bookings, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async adminListBookings(query) {
    try {

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;

      const options = getPaginationAndSortingOptions(query);
      
      const bookings = await BookingModel.find(_query, options);

      return { bookings, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getBooking(user,bookingId) {
    try {

      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const booking = await BookingModel.findOne({ _id: bookingId });
      
      if (!booking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(booking['clinetId']!=userId ||booking['providerId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }

      return booking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async clientCreateBooking(user,bookingData) {
    try {
 
      const clinetId = _.get(user, '_id');

      const existingProvider = await MaintenanceCenterModel.findOne({
       _id:bookingData.providerId } );
      if (existingProvider) {
        throw new ErrorResponse(
          bookingErrors.PROVIDER_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.PROVIDER_NOT_FOUND.code
        );
      }
      const currentTime = moment();
      const bookingTime = moment(bookingData.bookingTime);

      if (!bookingTime.isAfter(currentTime)) {
        throw new ErrorResponse(
          bookingErrors.INVALID_BOOKING_Time.message,
          BAD_REQUEST,
          bookingErrors.INVALID_BOOKING_Time.code
        );
      }
      const existingVehicle = VehicleModel.findOne({
        _id:bookingData.vehicleId, userId:bookingData.clientId
      })

      if(!existingVehicle){
        throw new ErrorResponse(
          bookingErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.VEHICLE_NOT_FOUND.code
        );
      }
      bookingData= {...bookingData,
        clinetId
      };
      const createdBooking = await BookingModel.create(bookingData);
      return createdBooking;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatBooking(user,bookingId, bookingData) {
    try {
      const userId = _.get(user, '_id');
      const user = await usersService.getUser(userId)  


      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }

      if(existingBooking['clientId']!=userId ||existingBooking['providerId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.INVALID_USER.message,
          BAD_REQUEST,
          bookingErrors.INVALID_USER.code
        );
      }

      if(bookingData.bookingTime){
        const currentTime = moment();
        const bookingTime = moment(bookingData.bookingTime);
        
        if (!bookingTime.isAfter(currentTime)) {
          throw new ErrorResponse(
          bookingErrors.INVALID_BOOKING_Time.message,
          BAD_REQUEST,
          bookingErrors.INVALID_BOOKING_Time.code
          );
        }
      }

      if(bookingData.vehicleId){
        const clientId = bookingData.clientId || userId;
        const existingVehicle = VehicleModel.findOne({
          _id:bookingData.vehicleId, userId:clientId
        })
  
        if(!existingVehicle){
          throw new ErrorResponse(
            bookingErrors.VEHICLE_NOT_FOUND.message,
            BAD_REQUEST,
            bookingErrors.VEHICLE_NOT_FOUND.code
          );
        }
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, bookingData );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async approveBooking(user,bookingId, bookingData) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['providerId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.APPROVED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async declineBooking(user,bookingId, bookingData) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['providerId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.DECLINED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['clientId']!=userId || existingBooking['providerId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }
      return BookingModel.delete({ _id: bookingId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async countBookings(query = {}, options) {
    try {
      const bookingsQuery = { ...query };
      return await BookingModel.count(bookingsQuery);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  
}

export default new BookingService();
