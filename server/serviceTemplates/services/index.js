import _ from 'lodash';
import serviceTemplateModel from '../models/index.js'; // Ensure the path is correct
import { USER_ROLES } from '../../../common/helpers/constants.js';
import { serviceTemplateStatuses } from '../helpers/constants.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import servicesService from '../../services/services/index.js';
import { servicesTypes } from '../../services/helpers/constants.js';

class serviceTemplatesService {
  // list for Admin
  async listServiceTemplates(user, query) {
    try {
      const { limit, skip, sort, page } = getPaginationAndSortingOptions(query);
      const selector = {};

      if (query.name) selector.name = query.name;
      if (query.nameAr) selector.nameAr = query.nameAr;
      if (query.status) selector.status = query.status;

      const serviceTemplates = await serviceTemplateModel
        .find(selector)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      const count = await serviceTemplateModel.countDocuments(selector);

      return {
        data: serviceTemplates,
        count,
        page,
        limit
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  // List templates for provider
  async listServiceTemplatesForProvider(user, query) {
    try {
      const { limit, skip, sort, page } = getPaginationAndSortingOptions(query);
      const selector = {
        $or: [{ status: serviceTemplateStatuses.APPROVED }, { creatorId: user._id }]
      };

      if (query.name) selector.name = query.name;
      if (query.nameAr) selector.nameAr = query.nameAr;

      const serviceTemplates = await serviceTemplateModel
        .find(selector)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      const count = await serviceTemplateModel.countDocuments(selector);

      return {
        data: serviceTemplates,
        count,
        page,
        limit
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getServiceTemplate(user, serviceTemplateId) {
    try {
      const selector = {
        _id: serviceTemplateId
      };

      // If the user is a provider, only allow them to see approved templates or templates they created
      if (user.role === USER_ROLES.PROVIDER) {
        selector.$or = [{ status: serviceTemplateStatuses.APPROVED }, { creatorId: user._id }];
      }

      const serviceTemplate = await serviceTemplateModel.findOne(selector);
      return serviceTemplate;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createServiceTemplate(user, body) {
    try {
      const newServiceTemplate = await serviceTemplateModel.create(body);
      return newServiceTemplate;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateServiceTemplateByAdmin(user, serviceTemplateId, payload) {
    try {
      const selector = { _id: serviceTemplateId };

      const serviceTemplate = await serviceTemplateModel.findOne(selector);
      if (!serviceTemplate) throw new Error('Service Template not found');

      const updatedServiceTemplate = await serviceTemplateModel.update(
        { _id: serviceTemplateId },
        payload
      );
      return updatedServiceTemplate;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateServiceTemplateByProvider(user, serviceTemplateId, payload) {
    try {
      const selector = {
        _id: serviceTemplateId,
        $or: [{ status: serviceTemplateStatuses.APPROVED }, { creatorId: user._id }]
      };

      const serviceTemplate = await serviceTemplateModel.findOne(selector);
      if (!serviceTemplate) throw new Error('Service Template not found');

      const updatedServiceTemplate = await serviceTemplateModel.update(
        { _id: serviceTemplateId },
        payload
      );
      return updatedServiceTemplate;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  async deleteServiceTemplate(user, serviceTemplateId) {
    try {
      const selector = { _id: serviceTemplateId };
      if (user.role == USER_ROLES.PROVIDER)
        selector.$and = [{ status: serviceTemplateStatuses.PENDING }, { creatorId: user._id }];

      const serviceTemplate = await serviceTemplateModel.findOne(selector);
      if (!serviceTemplate) throw new Error('Service Template cannot be deleted');

      await serviceTemplateModel.delete(selector);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async requestServiceTemplate(user, body) {
    try {
      const newRequest = {
        ...body,
        status: serviceTemplateStatuses.PENDING,
        creatorId: user._id
      };

      const requestedServiceTemplate = await serviceTemplateModel.create(newRequest);
      return requestedServiceTemplate;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async cloneTemplateForProvider(user, serviceTemplateId, maintenanceCenterId) {
    try {
      const serviceTemplate = await serviceTemplateModel.findOne({
        _id: serviceTemplateId,
        status: serviceTemplateStatuses.APPROVED
      });
      if (!serviceTemplate) throw new Error('Service Template not found');
      const serviceBody = {
        ...serviceTemplate,
        type: servicesTypes.CUSTOM, // remove after refactoring the services module
        maintenanceCenterId
      };
      const providerService = await servicesService.createService(user, serviceBody);
      return providerService;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new serviceTemplatesService();
