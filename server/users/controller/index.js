import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constant.js';
import usersService from '../services/usersService.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  // AUTH FOR CLIENT
  [CONTROLLERS.LOGIN]: async (req, res, next) => {
    try {
      const { isPersistent } = req.body;
      const { user, accessToken, refreshToken } = await usersService.login(req.body);

      const cookieOptions = {
        httpOnly: true, // The cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Requires secure in production (HTTPS)
        sameSite: 'none' // Allows the cookie to be sent with cross-site requests
      };
      isPersistent ? (cookieOptions['maxAge'] = 7 * 24 * 60 * 60 * 1000) : '';

      res.cookie('refreshToken', refreshToken, cookieOptions);

      res.status(StatusCodes.OK).json({
        success: true,
        user,
        accessToken
      });
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

  [CONTROLLERS.REFRESH_TOKEN]: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ErrorResponse(
          'No refresh token found',
          StatusCodes.BAD_REQUEST,
          'NO_REFRESH_TOKEN'
        );
      }

      const { user, accessToken, newRefreshToken } = await usersService.refreshToken(refreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none'
      });

      res.status(StatusCodes.OK).json({
        success: true,
        user,
        accessToken
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.VERIFY_EMAIL]: async (req, res, next) => {
    try {
      const data = await usersService.verifyAccount(req.body.token);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.RESET_PASSWORD_CODE_TOKEN]: async (req, res, next) => {
    try {
      const data = await usersService.generateForgetMyPasswordTokenLink(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.VERIFY_TOKEN_AND_RESET_PASSWORD]: async (req, res, next) => {
    try {
      const data = await usersService.verifyTokenAndResetPassword(
        req.body.token,
        req.body.newPassword
      );
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  // ADMIN

  [CONTROLLERS.LIST_USERS]: async (req, res, next) => {
    try {
      const data = await usersService.listUsers(req.query);
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
  [CONTROLLERS.UPDATE_USER]: async (req, res, next) => {
    try {
      const data = await usersService.updateUser(req.params.id, req.body);
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
  [CONTROLLERS.RESEND_VERIFICATION_EMAIL]: async (req, res, next) => {
    try {
      // console.log(req.body.email);
      const data = await usersService.resendVerificationEmail(req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
