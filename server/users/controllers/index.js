import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import usersService from '../services/usersService.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLERS.LIST_USERS]: async (req, res, next) => {
    try {
      const data = await usersService.listUsers(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_USERS]: async (req, res, next) => {
    try {
      const data = await usersService.countUsers(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GET_USER]: async (req, res, next) => {
    try {
      const data = await usersService.getUser(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.CREATE_USER]: async (req, res, next) => {
    try {
      const data = await usersService.createUser(req.body, req.body.role);
      delete data.token
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_USER]: async (req, res, next) => {
    try {
      const data = await usersService.updateUser(req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DEACTIVATE_USER]: async (req, res, next) => {
    try {
      const data = await usersService.deactivateUser(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.DELETE_USER]: async (req, res, next) => {
    try {
      const data = await usersService.deleteUser(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.ADMIN_LOGIN]: async (req, res, next) => {
    try {
      const data = await usersService.adminLogin(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.USER_LOGIN]: async (req, res, next) => {
    try {
      const data = await usersService.login(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.SIGNUP]: async (req, res, next) => {
    try {
      const data = await usersService.createUser(req.body, req.body.role);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.GENERATE_EMAIL_VERIFICATION_CODE]: async (req, res, next) => {
    try {
      const data = await usersService.generateVerificationCode(req.user);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.VERIFY_EMAIL]: async (req, res, next) => {
    try {
      const data = await usersService.verifyEmail(req.user, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.RESET_PASSWORD]: async (req, res, next) => {
    try {
      const data = await usersService.resetPassword(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.RESET_PASSWORD_CODE_VERIFICATION]: async (req, res, next) => {
    try {
      const data = await usersService.verifyResetPasswordCode(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
