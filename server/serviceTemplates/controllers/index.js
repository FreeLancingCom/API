import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import serviceTemplatesService from '../services/index.js';
import logger from '../../../common/utils/logger/index.js';

const { OK } = StatusCodes;

export default {
  [CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_ADMIN]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.listServiceTemplates(req.user, req.query);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.LIST_SERVICE_TEMPLATES_BY_PROVIDER]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.listServiceTemplatesForProvider(
        req.user,
        req.query
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_SERVICE_TEMPLATE]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.getServiceTemplate(
        req.user,
        req.params.serviceTemplateId
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_SERVICE_TEMPLATE]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.createServiceTemplate(req.user, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_SERVICE_TEMPLATE_ADMIN]: async (req, res, next) => {
    try {
      const user = req.user;
      const serviceTemplateId = req.params.serviceTemplateId;
      const data = await serviceTemplatesService.updateServiceTemplateByAdmin(
        user,
        serviceTemplateId,
        req.body
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_SERVICE_TEMPLATE_PROVIDER]: async (req, res, next) => {
    try {
      const user = req.user;
      const serviceTemplateId = req.params.serviceTemplateId;
      const data = await serviceTemplatesService.updateServiceTemplateByProvider(
        user,
        serviceTemplateId,
        req.body
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_SERVICE_TEMPLATES]: async (req, res, next) => {
    try {
      await serviceTemplatesService.deleteServiceTemplate(req.user, req.params.serviceTemplateId);
      return res.status(OK).json({
        success: true
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.REQUEST_SERVICE_TEMPLATE]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.requestServiceTemplate(req.user, req.body);
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CLONE_SERVICE_TEMPLATE_FOR_PROVIDER]: async (req, res, next) => {
    try {
      const data = await serviceTemplatesService.cloneTemplateForProvider(
        req.user,
        req.params.serviceTemplateId,
        req.body.maintenanceCenterId
      );
      return res.status(OK).json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
