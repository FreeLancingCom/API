import _ from 'lodash';
import serviceModel from '../models/index.js'; // Ensure the path is correct
import { USER_ROLES } from '../../../common/helpers/constants.js';
import logger from '../../../common/utils/logger/index.js';
import serviceTypesServices from '../../serviceTypes/services/serviceTypesServices.js';
import { servicesErrors } from '../helpers/constants.js';
import { searchSelectorsFun } from '../helpers/searchSelectors.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

class servicesService {
  // list for admin and providers
  async listServices(user, query) {
    try {
      const selectors = searchSelectorsFun(query);
      const options = getPaginationAndSortingOptions(query);

      // If user is center admin get services that are related to their maintenance centers
      const isCenterAdmin = user.role == USER_ROLES.PROVIDER;
      if (isCenterAdmin) selectors.maintenanceCenterId = user.maintenanceCenterId;

      const services = await serviceModel.find(selectors, options);
      const count = await serviceModel.count(selectors);

      return {
        services,
        options: {
          ...options,
          count
        }
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  // return back here
  async listServicesForClient(user, maintenanceCenterId, query) {
    try {
      const selectors = searchSelectorsFun(query);
      const options = getPaginationAndSortingOptions(query);

      selectors.maintenanceCenterId = maintenanceCenterId

      const services = await serviceModel.find(selectors, options);
      const count = await serviceModel.count(selectors);

      return {
        services,
        options: {
          ...options,
          count
        }
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
      body['maintenanceCenterId'] = user.maintenanceCenterId
      const serviceType = await serviceTypesServices.getServiceType(body.typeId)
      if (!serviceType)
        throw new ErrorResponse(
          servicesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          servicesErrors.SERVICE_TYPE_NOT_FOUND.code
        );

      //don't let the maintenance center have more than one service of the same type and model
      //TODO add model in the selectors when it is implemented
      const serviceExists = await serviceModel.findOne({ typeId: serviceType._id, maintenanceCenterId: body.maintenanceCenterId })
      if (serviceExists)
        throw new ErrorResponse(
          servicesErrors.SERVICE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          servicesErrors.SERVICE_ALREADY_EXISTS.code
        );

      body['name'] = serviceType.name
      body['nameAr'] = serviceType.nameAr

      const newService = await serviceModel.create(body);

      return newService;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateService(user, serviceId, payload) {
    try {
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

  async countServices(query) {
    try {
      const selectors = searchSelectorsFun(query);
      const count = await serviceModel.count(selectors);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
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
