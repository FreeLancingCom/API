import _ from 'lodash';
import serviceModel from '../models/index.js'; // Ensure the path is correct
import { USER_ROLES } from '../../../common/helpers/constants.js';
import { servicesTypes } from '../helpers/constants.js';
import maintenanceCenter from '../../maintenanceCenter/services/index.js';
import logger from '../../../common/utils/logger/index.js';

class servicesService {
  async listServices(user, query) {
    try {
      const { page = 1, limit = 10 } = query;
      const skip = (page - 1) * limit;
      const options = { page, limit, skip };
      const selector = {};

      // If user is center admin get services that are general or related custom for their maintenance centers
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin)
        selector.$or = [
          { maintenanceCenterId: { $in: user.maintenanceCenters } },
          { type: servicesTypes.GENERAL }
        ];

      if (query.name) selector = { name: query.name };
      if (query.nameAr) selector = { name: query.nameAr };
      if (query.centerId && !isCenterAdmin) selector = { type: query.centerId };

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

  async getService(user, _id) {
    try {
      const selector = {
        _id
      };
      // If user is center admin get services that are general or related custom for their maintenance centers
      if (user.role == USER_ROLES.PROVIDER)
        selector.$or = [
          { maintenanceCenterId: { $in: user.maintenanceCenters } },
          { type: servicesTypes.GENERAL }
        ];

      const service = await serviceModel.findOne(selector);
      return service;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createService(user, body) {
    try {
      // Center Admin can only create custom services
      const isCustomService = body.type == servicesTypes.CUSTOM;
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin && !isCustomService)
        throw new Error('Center Admins can only create custom services');

      if (isCustomService) {
        if (!body.maintenanceCenterId) throw new Error('Please provide maintenance center id');
        if (!user.maintenanceCenters.includes(body.maintenanceCenterId))
          throw new Error('You Cannot create a custom service for this center.');
      }

      if (!isCustomService && body.maintenanceCenterId) delete body.maintenanceCenterId;

      const newService = await serviceModel.create(body);
      if (isCustomService) {
        await maintenanceCenter.updateMaintenanceCenter(user, body.maintenanceCenterId, {
          services: [newService._id]
        });
      }

      return newService;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateService(user, serviceId, payload) {
    try {
      // only name updates are allowed
      const selector = { _id: serviceId };
      // If user is center admin, they can only edit services that are was created fot their MCs
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin) {
        selector.maintenanceCenterId = { $in: user.maintenanceCenters };
      }

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
      const selector = { _id: serviceId };
      // If user is center admin, they can only edit services that are was created fot their MCs
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin) {
        selector.maintenanceCenterId = { $in: user.maintenanceCenters };
      }

      const service = await this.getService(user, serviceId);
      if (!service) throw new Error('Service Cannot be deleted');

      const maintenanceCenterId = service.maintenanceCenterId;
      await serviceModel.delete({ _id: serviceId });

      // Pull the removed service from maintenanceCenter.services
      await maintenanceCenter.updateMaintenanceCenter(user, maintenanceCenterId, {
        removedServices: [serviceId]
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getServiceByTypeId(typeId, options) {
    try {
      const service = await serviceModel.findOne({ typeId }, options);
      if (service)
        return true
      return false;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new servicesService();
