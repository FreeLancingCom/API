import _ from 'lodash';
import MaintenanceCenter from '../models/index.js'; // Ensure the path is correct
import countriesService from '../../countries/services/countriesService.js';
import usersService from '../../users/services/usersService.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import logger from '../../../common/utils/logger/index.js';
import servicesService from '../../services/services/index.js';
import { maintenanceCentersErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import StatusCodes from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

class MaintenanceCenterService {
  async listMaintenanceCenters(user, query) {
    try {
      const { page = 1, limit = 10 } = query;
      const skip = (page - 1) * limit;
      const options = { page, limit, skip };

      const selector = {};
      if (query.name) selector = { name: query.name };

      const maintenanceCenters = await MaintenanceCenter.find(selector, options);
      const count = await MaintenanceCenter.count(selector);

      return {
        data: maintenanceCenters,
        count,
        page,
        limit
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getMaintenanceCenter(user, _id) {
    try {
      const selector = {
        _id
      };
      const maintenanceCenter = MaintenanceCenter.findOne(selector);
      if (!maintenanceCenter) {
        throw new ErrorResponse(
          maintenanceCentersErrors.MAINTENANCE_CENTER_NOT_FOUND.message,
          BAD_REQUEST,
          maintenanceCentersErrors.MAINTENANCE_CENTER_NOT_FOUND.code
        );
      }

      return maintenanceCenter
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createMaintenanceCenter(user, body) {
    try {
      const formattedBody = {};
      const name = body.name;
      const existingCenter = await MaintenanceCenter.findOne({ name });
      if (existingCenter) throw new Error('Maintenance Center name already exists');

      formattedBody.name = name;
      formattedBody.admins = [user._id];
      formattedBody.address = body.address;
      formattedBody.landline = body.landline;
      formattedBody.taxRegistrationNo = body.taxRegistrationNo;
      formattedBody.commercialRegistrationNo = body.commercialRegistrationNo;

      const countryId = body.countryId;
      const countryData = await countriesService.getCountry(countryId);
      formattedBody.country = { _id: countryData._id, name: countryData.name };

      const newMaintenanceCenter = await MaintenanceCenter.create(formattedBody);

      await usersService.updateUser(user._id, {
        $push: { maintenanceCenters: newMaintenanceCenter._id }
      });

      return newMaintenanceCenter;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateMaintenanceCenter(user, centerId, payload) {
    try {
      const maintenanceCenter = await MaintenanceCenter.findOne({ _id: centerId });
      if (!maintenanceCenter) throw new Error('Maintenance Center not found');

      if (payload.products) {
        // TODO: handle products
      }

      // check if provided array of service IDs exist
      let validatedServices = [];
      if (payload.services) {
        validatedServices = await Promise.all(
          payload.services.map(async serviceId => {
            const service = await servicesService.getService(user, serviceId);
            return { _id: service._id, cost: service.cost };
          })
        );

        validatedServices = [...validatedServices, maintenanceCenter.services];
        validatedServices = _.uniqBy(validatedServices, 'id');
        payload.$push = { services: validatedServices };

        delete payload.services;
      }

      if (payload.removedServices) {
        payload.$pull = { services: { _id: { $in: payload.removedServices } } };
      }
      // Check if admins to be added to the MC exist
      let validAdminIds = [];
      if (payload.admins) {
        validAdminIds = await Promise.all(
          payload.admins.map(async adminId => {
            const user = await usersService.getUser(adminId);
            return user._id;
          })
        );
      }

      const countryId = payload.countryId;
      if (countryId) {
        const countryData = await countriesService.getCountry(countryId);
        payload.country = { _id: countryData._id, name: countryData.name };
      }

      logger.info(`[updateMaintenanceCenter][formattedUpdates]${JSON.stringify(payload)}`);
      const updatedMaintenanceCenter = await MaintenanceCenter.update({ _id: centerId }, payload);
      await usersService.updateManyUsers(
        { _id: { $in: validAdminIds } },
        {
          $push: { maintenanceCenters: updatedMaintenanceCenter._id }
        }
      );
      return updatedMaintenanceCenter;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteMaintenanceCenter(centerId) {
    try {
      return MaintenanceCenter.delete({ _id: centerId });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new MaintenanceCenterService();
