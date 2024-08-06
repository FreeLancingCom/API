import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import VehicleModel from '../models/index.js';
import { vehcileErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import usersService from '../../users/services/usersService.js';
const { BAD_REQUEST } = StatusCodes;
class VehicleService {
  async listVehicles(user,query) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;
      _query.userId = userId;

      const options = getPaginationAndSortingOptions(query);
      
      const vehicles = await VehicleModel.find(_query, options);

      return { vehicles, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async adminListVehicles(query) {
    try {

       const { page, limit, skip, sortBy, sortOrder, ..._query} = query;

      const options = getPaginationAndSortingOptions(query);
      
      const vehicles = await VehicleModel.find(_query, options);

      return { vehicles, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getVehicle(user,vehicleId) {
    try {

      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const vehicle = await VehicleModel.findOne({ _id: vehicleId });
      
      if (!vehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
        );
      }
      if(vehicle['userId']!=userId){
        throw new ErrorResponse(
          vehcileErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          vehcileErrors.USER_NOT_OWNER.code
        );
      }

      return vehicle;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createVehicle(user,vehicleData) {
    try {
      const existingUser = await VehicleModel.findOne({
         plateNumber: vehicleData.plateNumber } );
      const userId = _.get(user, '_id');

      if (existingUser) {
        throw new ErrorResponse(
          vehcileErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.USER_NOT_FOUND.code
        );
      }
      vehicleData= {...vehicleData,
        userId
      };
      const createdVehicle = await VehicleModel.create(vehicleData);
      return createdVehicle;

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatVehicle(user,vehicleId, vehicleData) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const existingVehicle = await VehicleModel.findOne({ _id: vehicleId });
      
      if (!existingVehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
        );
      }
      if(existingVehicle['userId']!=userId){
        throw new ErrorResponse(
          vehcileErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          vehcileErrors.USER_NOT_OWNER.code
        );
      }
      const updatedVehicle = await VehicleModel.update({ _id: vehicleId }, vehicleData );
      return updatedVehicle;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteVehicle(user,vehicleId) {
    try {
      const userId = _.get(user, '_id');
      await usersService.getUser(userId)  

      const existingVehicle = await VehicleModel.findOne({ _id: vehicleId });
      
      if (!existingVehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
        );
      }
      if(existingVehicle['userId']!=userId){
        throw new ErrorResponse(
          vehcileErrors.USER_NOT_OWNER.message,
          BAD_REQUEST,
          vehcileErrors.USER_NOT_OWNER.code
        );
      }
      return VehicleModel.delete({ _id: vehicleId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async countVehicles(query = {}, options) {
    try {
      const vehcilesQuery = { ...query };
      return await VehicleModel.count(vehcilesQuery);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  
}

export default new VehicleService();
