import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import VehicleModel from '../models/index.js';
import { vehcileErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
const { BAD_REQUEST } = StatusCodes;
class VehicleService {
  async listVehicles(query) {
    try {
      const { page, limit, skip, sortBy, sortOrder, ..._query } = query;

      const options = getPaginationAndSortingOptions(query);

      const vehicles = await VehicleModel.find(_query, options);

      return { vehicles, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getVehicle(vehcileId) {
    try {
      const vehicle = await VehicleModel.findOne({ _id: vehcileId });

      if (!vehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
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
          vehcileErrors.VEHICLE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_ALREADY_EXISTS.code
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

  async updatVehicle(vehcileId, vehicleData) {
    try {
      const existingVehicle = await VehicleModel.findOne({ _id: vehcileId });
      
      if (!existingVehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
        );
      }

      const updatedVehicle = await VehicleModel.update({ _id: vehcileId }, vehicleData );
      return updatedVehicle;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteVehicle(vehcileId) {
    try {
      const existingVehicle = await VehicleModel.findOne({ _id: vehcileId });

      if (!existingVehicle) {
        throw new ErrorResponse(
          vehcileErrors.VEHICLE_NOT_FOUND.message,
          BAD_REQUEST,
          vehcileErrors.VEHICLE_NOT_FOUND.code
        );
      }

      return VehicleModel.delete({ _id: vehcileId });
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
