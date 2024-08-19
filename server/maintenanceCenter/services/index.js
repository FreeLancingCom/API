import _ from 'lodash';
import MaintenanceCenter from '../models/index.js'; // Ensure the path is correct
import countriesService from '../../countries/services/countriesService.js';
import usersService from '../../users/services/usersService.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import logger from '../../../common/utils/logger/index.js';
import servicesService from '../../services/services/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

class MaintenanceCenterService {
  async listMaintenanceCenters(user, query) {
    try {
      const options = getPaginationAndSortingOptions(query);

      const selector = {};

      // Handle partial searching with regex
      if (query.name) selector.name = { $regex: query.name, $options: 'i' };

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
      return MaintenanceCenter.findOne(selector);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createMaintenanceCenter(user, body) {
    try {
      const formattedBody = {};
      const existingCenter = await MaintenanceCenter.findOne({ name: body.name });
      if (existingCenter) throw new Error('Maintenance Center name already exists');

      formattedBody.name = body.name;
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
        maintenanceCenterId: newMaintenanceCenter._id
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

      // Check if admins to be added to the MC exist
      let validAdminIds = [];
      if (payload.admins) {
        validAdminIds = await Promise.all(
          payload.admins.map(async adminId => {
            const user = await usersService.getUser(adminId);
            // There's a flaw here if admin already has maintenanceCenterId, it will be overwritten, and we don't send invitations or something
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
          maintenanceCenterId: updatedMaintenanceCenter._id
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
