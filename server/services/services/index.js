import _ from 'lodash';
import serviceModel from '../models/index.js'; // Ensure the path is correct
import { USER_ROLES } from '../../../common/helpers/constants.js';
import logger from '../../../common/utils/logger/index.js';

class servicesService {
  // list for admin and providers
  async listServices(user, query) {
    try {
      const options = getPaginationAndSortingOptions(query);
      const selector = {};

      // If user is center admin get services that are related to their maintenance centers
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin) selector.maintenanceCenterId = user.maintenanceCenterId;

      // Handle partial searching with regex
      if (query.name) selector.name = { $regex: query.name, $options: 'i' };
      if (query.nameAr) selector.nameAr = { $regex: query.nameAr, $options: 'i' };

      const services = await serviceModel.find(selector, options);
      const count = await serviceModel.count(selector);

      return {
        data: services,
        count,
        page,
        limit
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  // return back here
  async listServicesForClient(user, maintenanceCenterId, query) {
    try {
      const options = getPaginationAndSortingOptions(query);
      const selector = {
        maintenanceCenterId
      };

      // Handle partial searching with regex
      if (query.name) selector.name = { $regex: query.name, $options: 'i' };
      if (query.nameAr) selector.nameAr = { $regex: query.nameAr, $options: 'i' };

      const services = await serviceModel.find(selector, options);
      const count = await serviceModel.count(selector);

      return {
        data: services,
        count,
        page,
        limit
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  // Get for admin and providers
  async getService(user, _id) {
    try {
      const selector = {
        _id
      };

      // If user is center admin get service that is related to their maintenance centers
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin) selector.maintenanceCenterId = user.maintenanceCenterId;

      const service = await serviceModel.findOne(selector);
      return service;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getServiceByClient(user, maintenanceCenterId, _id) {
    try {
      const selector = {
        _id,
        maintenanceCenterId
      };
      const service = await serviceModel.findOne(selector);
      return service;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  // Only used by provider when cloning a service template or creating a new service
  async createService(user, body) {
    try {
      if (!body.maintenanceCenterId) throw new Error('Please provide maintenance center id');
      if (user.maintenanceCenterId != body.maintenanceCenterId)
        throw new Error('You Cannot create a custom service for this center.');

      const newService = await serviceModel.create(body);

      return newService;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateService(user, serviceId, payload) {
    try {
      // only name updates are allowed
      const selector = { _id: serviceId, maintenanceCenterId: user.maintenanceCenterId };

      const service = await serviceModel.findOne(selector);
      if (!service) throw new Error('Service not found');

      const newService = await serviceModel.update({ _id: serviceId }, payload);
      return newService;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteService(user, serviceId) {
    try {
      const selector = { _id: serviceId, maintenanceCenterId: user.maintenanceCenterId };
      const service = await serviceModel.findOne(selector);
      if (!service) throw new Error('Service Cannot be deleted');

      await serviceModel.delete({ _id: serviceId });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new servicesService();
