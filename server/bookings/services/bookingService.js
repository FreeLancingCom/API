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
import ServiceModel from '../../services/models/index.js';
import ProductModel from '../../products/model/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import { searchSelectorsFun } from '../helpers/searchSelectors.js';

class BookingService {
  async clientListBookings(user,query) {
    try {
      const userId = _.get(user, '_id');

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;
       
      _query.clientId = userId;

      const options = getPaginationAndSortingOptions(query);
      const selectors = searchSelectorsFun(query); 
      
      const bookings = await BookingModel.find(selectors, options);

      return { bookings, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async providerListBookings(user,query) {
    try {
      const userId = _.get(user, '_id');

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;
      _query.providerId = userId;

      const options = getPaginationAndSortingOptions(query);
      const selectors = searchSelectorsFun(query); 

      const bookings = await BookingModel.find(selectors, options);

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
      if (!existingProvider) {
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
      const totalPrice = await calculateTotalPrice(bookingData.services, bookingData.products);

      bookingData = {
        ...bookingData,
        clientId,
        price: {
          originalPrice: totalPrice,
          finalPrice: totalPrice, 
        },
      };
      
      const createdBooking = await BookingModel.create(bookingData);
      return createdBooking;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async rescheduleBooking(user,bookingId, bookingData) {
    try {
      const userId = _.get(user, '_id');

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['status']!=BOOKING_STATUS.PENDING){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_NOT_PENDING.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_NOT_PENDING.code
        );
      }
      if(existingBooking['providerId']!=userId ){
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

      const updatedBooking = await BookingModel.update({ _id: bookingId }, bookingData );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  
  async updatBooking(user,bookingId, bookingData) {
    try {
      const userId = _.get(user, '_id');

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['status']!=BOOKING_STATUS.PENDING){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_NOT_PENDING.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_NOT_PENDING.code
        );
      }

      if(existingBooking['clientId']!=userId  ){
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

  async approveProviderBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');
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
      if(existingBooking['status']==BOOKING_STATUS.APPROVED){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_ALREADY_APPROVED.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_ALREADY_APPROVED.code
        );
      }
      if(existingBooking['status']==BOOKING_STATUS.COMPELETED){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.code
        );
      }
      
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.APPROVED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async declineProviderBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');

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
      if(existingBooking['status']==BOOKING_STATUS.DECLINED){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_ALREADY_DECLINED.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_ALREADY_DECLINED.code
        );
      }
      if(existingBooking['status']==BOOKING_STATUS.COMPELETED){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.code
        );
      }
      
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.DECLINED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async approveClientBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['clientId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }
      if(existingBooking['status']!=BOOKING_STATUS.RESCHEDULED){
        throw new ErrorResponse(
          bookingErrors.UNVALID_RESCHEDULE.message,
          BAD_REQUEST,
          bookingErrors.UNVALID_RESCHEDULE.code
        );
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.APPROVED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async declineClientBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');

      const existingBooking = await BookingModel.findOne({ _id: bookingId });
      
      if (!existingBooking) {
        throw new ErrorResponse(
          bookingErrors.BOOKING_NOT_FOUND.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_NOT_FOUND.code
        );
      }
      if(existingBooking['clientId']!=userId ){
        throw new ErrorResponse(
          bookingErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          bookingErrors.USER_NOT_OWNER.code
        );
      }
      if(existingBooking['status']!=BOOKING_STATUS.RESCHEDULED){
        throw new ErrorResponse(
          bookingErrors.UNVALID_RESCHEDULE.message,
          BAD_REQUEST,
          bookingErrors.UNVALID_RESCHEDULE.code
        );
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.DECLINED} );
      return updatedBooking;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async completeBooking(user,bookingId) {
    try {
      const userId = _.get(user, '_id');

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
      if(existingBooking['status']==BOOKING_STATUS.COMPELETED){
        throw new ErrorResponse(
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.message,
          BAD_REQUEST,
          bookingErrors.BOOKING_IS_ALREADY_COMPLETED.code
        );
      }
      const updatedBooking = await BookingModel.update({ _id: bookingId }, {status:BOOKING_STATUS.COMPELETED} );
      return updatedBooking;

      // TODO create a report of this booking 
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async countBookings(userRole,userId, query) {
    try {
      const selectors = searchSelectorsFun(query); 
      if (userRole === USER_ROLES.CLIENT ) {
        selectors.clientId = userId
      }
      if (userRole === USER_ROLES.PROVIDER ) {
        selectors.providerId = userId
      }
      
      return await BookingModel.count(selectors);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  
  async calculateTotalPrice(serviceIds, productIds) {
  let totalPrice = 0;

  if (serviceIds && serviceIds.length > 0) {
    const services = await ServiceModel.find({ _id: { $in: serviceIds } });
    if (services.length !== serviceIds.length) {
      throw new ErrorResponse(
        bookingErrors.SERVICE_NOT_FOUND.message,
        BAD_REQUEST,
        bookingErrors.SERVICE_NOT_FOUND.code
      );
    }
    services.forEach(service => {
      totalPrice += service.cost; 
    });
  }

  // Fetch products and check if all exist
  if (productIds && productIds.length > 0) {
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new ErrorResponse(
        bookingErrors.PRODUCT_NOT_FOUND.message,
        BAD_REQUEST,
        bookingErrors.PRODUCT_NOT_FOUND.code
      );
    }
    products.forEach(product => {
      totalPrice += product.price.finalPrice; 
    });
  }

  return totalPrice;
}
}

export default new BookingService();
