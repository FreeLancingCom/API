import roadServiceModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { roadServicesErrors } from '../helper/constant.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

class RoadServicesService {
  async listRoadServices(query, role) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const roadServices = await roadServiceModel.find(_query, options);
      const count = await this.countRoadServices(_query, role);

      options.count = count;

      return { roadServices, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getRoadService(roadServiceId) {
    try {
      const roadService = await roadServiceModel.findOne({ _id: roadServiceId });
      if (!roadService) {
        throw new ErrorResponse(
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.message,
          BAD_REQUEST,
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.code
        );
      }
      return roadService;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createRoadService(body) {
    try {
      const isExistRoadService = await roadServiceModel.findOne({
        name: body.name,
        type: body.type
      });

      if (isExistRoadService) {
        throw new ErrorResponse(
          roadServicesErrors.ROAD_SERVICE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          roadServicesErrors.ROAD_SERVICE_ALREADY_EXISTS.code
        );
      }

      const roadService = await roadServiceModel.create(body);
      return roadService;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateRoadService(roadServiceId, body) {
    try {
      const isExistRoadService = await roadServiceModel.findOne({ _id: roadServiceId });

      if (!isExistRoadService) {
        throw new ErrorResponse(
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.message,
          BAD_REQUEST,
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.code
        );
      }

      const roadService = await roadServiceModel.update({ _id: roadServiceId }, body);
      return roadService;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteRoadService(roadServiceId) {
    try {
      const isExistRoadService = await roadServiceModel.findOne({ _id: roadServiceId });

      if (!isExistRoadService) {
        throw new ErrorResponse(
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.message,
          BAD_REQUEST,
          roadServicesErrors.ROAD_SERVICE_NOT_FOUND.code
        );
      }
      return await roadServiceModel.delete({ _id: roadServiceId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countRoadServices(query, role = USER_ROLES.ADMIN) {
    try {
      if (role !== USER_ROLES.ADMIN && !query['type']) {
        throw new ErrorResponse(
          roadServicesErrors.ROAD_SERVICE_COUNT_FAILED.message,
          BAD_REQUEST,
          roadServicesErrors.ROAD_SERVICE_COUNT_FAILED.code
        );
      } //?here in list the other roles only can see the road services of their type , forex [gas , tire , battery] , but can not see the full count of all road services
      const count = await roadServiceModel.count(query);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new RoadServicesService();
