import ServiceTypeModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import notificationsService from '../../notifications/services/notificationsService.js';
import {
  serviceTypesErrors,
  SERVICE_STATUS,
  SERVICE_APPROVED,
  SERVICE_DECLINED
} from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import serviceService from '../../services/services/index.js';
import { searchSelectorsFun } from '../helpers/searchSelectors.js';

class ServiceTypeService {

  async listServicesTypes(userRole, query) {
    try {
      const { limit, skip, sort, ..._query } = query;
      const options = getPaginationAndSortingOptions(query);
      const selectors = searchSelectorsFun(query); 

      if (userRole === USER_ROLES.CLIENT || userRole === USER_ROLES.PROVIDER) {
        selectors.status = SERVICE_STATUS.APPROVED
      }

      const serviceTypes = await ServiceTypeModel.find(selectors, options);

      return { serviceTypes, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getServiceType(serviceTypeId) {
    try {
      const serviceType = await ServiceTypeModel.findOne({ _id: serviceTypeId });
      if (!serviceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.code
        );
      }
      return serviceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createServiceType(userId, body) {
    try {

      body['creatorId'] = userId;
      const isExistServiceType = await ServiceTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isExistServiceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.code
        );
      }

      const createdServiceType = await ServiceTypeModel.create(body);
      return createdServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateServiceType(serviceTypeId, body) {
    try {
      const isExistServiceType = await ServiceTypeModel.findOne({ _id: serviceTypeId });

      if (!isExistServiceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.code
        );
      }

      const isRepeatedNameOrNameAr = await ServiceTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isRepeatedNameOrNameAr) 
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.code
        );
      
      const isExistsService = await serviceService.getServiceByTypeId(serviceTypeId)
      if (isExistsService)
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_IS_ALREADY_USED.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_IS_ALREADY_USED.code
        );

      const updatedServiceType = await ServiceTypeModel.update({ _id: serviceTypeId }, body);
      return updatedServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteServiceType(serviceTypeId) {
    try {
      const isExistServiceType = await ServiceTypeModel.findOne({ _id: serviceTypeId });

      if (!isExistServiceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.code
        );
      }

      const isExistsService = await serviceService.getServiceByTypeId(serviceTypeId)
      if (isExistsService)
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_IS_ALREADY_USED.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_IS_ALREADY_USED.code
        );

      const deletedServiceType = await ServiceTypeModel.delete({ _id: serviceTypeId });
      return deletedServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async approveServiceType(userId, serviceTypeId) {
    try {
      const isExistServiceType = await ServiceTypeModel.findOne({ _id: serviceTypeId });

      if (!isExistServiceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.code
        );
      }

      if (isExistServiceType.status != SERVICE_STATUS.PENDING) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_PENDING.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_PENDING.code
        );
      }

      const approvedServiceType = await ServiceTypeModel.update(
        { _id: serviceTypeId },
        { status: SERVICE_STATUS.APPROVED }
      );
      const notificationData = {
        contentType: 'message',
        targets: [isExistServiceType.creatorId],
        message: SERVICE_APPROVED(isExistServiceType.name)
      };
      notificationsService.createNotification(userId, notificationData);
      return approvedServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async declineServiceType(userId, serviceTypeId) {
    try {
      const isExistServiceType = await ServiceTypeModel.findOne({ _id: serviceTypeId });

      if (!isExistServiceType) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_FOUND.code
        );
      }

      if (isExistServiceType.status != SERVICE_STATUS.PENDING) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_NOT_PENDING.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_NOT_PENDING.code
        );
      }

      const declinedServiceType = await ServiceTypeModel.update(
        { _id: serviceTypeId },
        { status: SERVICE_STATUS.DECLINED }
      );

      const notificationData = {
        contentType: 'message',
        targets: [isExistServiceType.creatorId],
        message: SERVICE_DECLINED(isExistServiceType.name)
      };
      notificationsService.createNotification(userId, notificationData);

      return declinedServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async requestServiceType(userId, body) {
    body['creatorId'] = userId;
    try {
      const isExistService = await ServiceTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isExistService) {
        throw new ErrorResponse(
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          serviceTypesErrors.SERVICE_TYPE_ALREADY_EXISTS.code
        );
      }
      body['status'] = SERVICE_STATUS.PENDING;
      const createdServiceType = await ServiceTypeModel.create(body);
      return createdServiceType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async countServiceTypes(userRole, query) {
    try {
      const selectors = searchSelectorsFun(query); 
      if (userRole === USER_ROLES.CLIENT || userRole === USER_ROLES.PROVIDER) {
        selectors.status = SERVICE_STATUS.APPROVED
      }
      const count = await ServiceTypeModel.count(selectors);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new ServiceTypeService();
