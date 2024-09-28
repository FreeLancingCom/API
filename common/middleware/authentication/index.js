import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import logger from '../../utils/logger/index.js';
import { errorCodes, USER_ROLES } from '../../helpers/constants.js';
import { isValidRole } from '../../helpers/isValid.js';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../../../config/env/index.js';
import userModel from '../../../server/users/model/index.js';

const Authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const refreshTokenCookie = req.cookies.refreshToken;

    // Debugging: Check if cookies are available
    console.log('Cookies:', req.cookies);
    console.log('Refresh Token:', refreshTokenCookie);

    if (!authHeader)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: errorCodes.USER_NOT_AUTHORIZED.message,
        statusCode: StatusCodes.UNAUTHORIZED,
        errorCode: errorCodes.USER_NOT_AUTHORIZED.code,
      });

    if (!authHeader.startsWith('Bearer ') || authHeader.trim().split(' ').length !== 2)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: errorCodes.INVALID_TOKEN.message,
        statusCode: StatusCodes.UNAUTHORIZED,
        errorCode: errorCodes.INVALID_TOKEN.code,
      });

    const token = authHeader.split(' ')[1];
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError' && refreshTokenCookie) {
        logger.info('Access token expired, attempting to refresh...');
        try {
          const refreshDecoded = jwt.verify(refreshTokenCookie, JWT_REFRESH_SECRET);
          const userId = _.get(refreshDecoded, 'userId', null);

          if (!userId) {
            return res.status(StatusCodes.FORBIDDEN).json({
              message: errorCodes.INVALID_TOKEN.message,
              statusCode: StatusCodes.FORBIDDEN,
              errorCode: errorCodes.INVALID_TOKEN.code,
            });
          }

          const user = await userModel.find({ _id: userId });
          if (!user) {
            return res.status(StatusCodes.FORBIDDEN).json({
              message: errorCodes.USER_NOT_FOUND.message,
              statusCode: StatusCodes.FORBIDDEN,
              errorCode: errorCodes.USER_NOT_FOUND.code,
            });
          }

          const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
          res.setHeader('Authorization', `Bearer ${newAccessToken}`);

          req.user = user;
          return next();
        } catch (refreshError) {
          logger.error(`Error verifying refresh token: ${refreshError.message}`);
          return res.status(StatusCodes.FORBIDDEN).json({
            message: errorCodes.INVALID_REFRESH_TOKEN.message,
            statusCode: StatusCodes.FORBIDDEN,
            errorCode: errorCodes.INVALID_REFRESH_TOKEN.code,
          });
        }
      }

      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: errorCodes.INVALID_TOKEN.message,
        statusCode: StatusCodes.UNAUTHORIZED,
        errorCode: errorCodes.INVALID_TOKEN.code
      });
    }

    const userId = _.get(decoded, 'userId', null);
    if (!userId)
      return res.status(StatusCodes.FORBIDDEN).json({
        message: errorCodes.INVALID_TOKEN.message,
        statusCode: StatusCodes.FORBIDDEN,
        errorCode: errorCodes.INVALID_TOKEN.code
      });

    const user = await userModel.findOneAndIncludeOTP({ _id: userId });
    if (!user)
      return res.status(StatusCodes.FORBIDDEN).json({
        message: errorCodes.USER_NOT_FOUND.message,
        statusCode: StatusCodes.FORBIDDEN,
        errorCode: errorCodes.USER_NOT_FOUND.code
      });

    const userRole = _.get(user, 'role', null);
    if (!isValidRole(userRole, USER_ROLES)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: errorCodes.USER_NOT_AUTHORIZED.message,
        statusCode: StatusCodes.FORBIDDEN,
        errorCode: errorCodes.USER_NOT_AUTHORIZED.code
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Error in authenticateToken middleware: ${error.message}`);
    next(error);
  }
};

export default Authenticate;
