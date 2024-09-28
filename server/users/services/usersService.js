import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../model/index.js';
import { usersErrors } from '../helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import { generateToken , generateRefreshToken } from '../../../common/utils/jwt/index.js';
import { JWT_LONG_EXPIRY, JWT_SHORT_EXPIRY , JWT_REFRESH_SECRET } from '../../../config/env/index.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const { BAD_REQUEST } = StatusCodes;
class UserService {




  async login(body) {
    try {
      const { email, password } = body;

      const user = await UserModel.findOneAndIncludePassword({ email });
      if (!user || !user.isVerified) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }
    

      console.log(user.password);
    
      const isMatch = await bcrypt.compare(password, user.password );
      if (!isMatch) {
        throw new ErrorResponse(
          usersErrors.INVALID_CREDENTIALS.message,
          BAD_REQUEST,
          usersErrors.INVALID_CREDENTIALS.code
        );
      }

      const accessToken = await generateToken(user, JWT_SHORT_EXPIRY);
      const refreshToken = await generateRefreshToken(user, JWT_LONG_EXPIRY);

      console.log(refreshToken);



      delete user.password;

        return { user, accessToken, refreshToken };

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createUser(userData) {
    try {
      const existingUser = await UserModel.findOne({ email: userData.email });

      if (existingUser) {
        throw new ErrorResponse(
          usersErrors.USER_ALREADY_EXISTS.message,
          BAD_REQUEST,
          usersErrors.USER_ALREADY_EXISTS.code
        );
      }
   
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, salt);


      if (userData.password !== userData.confirmPassword) {
      throw new ErrorResponse(
          usersErrors.USER_CREATION_FAILED.message,
         BAD_REQUEST,
          usersErrors.USER_CREATION_FAILED.code
      );

      }

      userData.isVerified = false;


    
   

      const _user = await UserModel.create({ ...userData });
      const { password, ...user } = _user.toObject();
      const token = await generateToken(user, JWT_SHORT_EXPIRY);
     
      return { user, token };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }



  async refreshToken(refreshToken) {
    try {
   

      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const userId = _.get(decoded, 'userId', null);



      if (!userId) {
        throw new ErrorResponse(
          'Invalid refresh token',
          StatusCodes.FORBIDDEN,
          'INVALID_REFRESH_TOKEN'
        );
      }

      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new ErrorResponse(
          'User not found',
          StatusCodes.FORBIDDEN,
          'USER_NOT_FOUND'
        );
      }

      const accessToken = await generateToken(user, JWT_SHORT_EXPIRY);
      const newRefreshToken = await generateRefreshToken(user, JWT_LONG_EXPIRY);


      return { user, accessToken, newRefreshToken };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }





  

}

export default new UserService();