import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../model/index.js';
import { usersErrors } from '../helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { generateToken, generateRefreshToken } from '../../../common/utils/jwt/index.js';
import {
  JWT_LONG_EXPIRY,
  JWT_SHORT_EXPIRY,
  JWT_REFRESH_SECRET
} from '../../../config/env/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import { EMAIL_TEMPLATES_DETAILS } from '../../email/helper/constant.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { USER_ROLES } from '../../../common/helpers/constants.js';

import EmailService from '../../email/service/emailService.js';

const { BAD_REQUEST } = StatusCodes;
class UserService {
  async login(body) {
    try {
      const { email, password  } = body;

      const user = await UserModel.findOneAndIncludePassword({ email });
      if (!user || !user.isVerified) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }


      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ErrorResponse(
          usersErrors.INVALID_CREDENTIALS.message,
          BAD_REQUEST,
          usersErrors.INVALID_CREDENTIALS.code
        );
      }

      const accessToken = await generateToken(user, JWT_SHORT_EXPIRY);
      const refreshToken = await generateRefreshToken(user, JWT_LONG_EXPIRY);


      delete user.password;

      return { user, accessToken, refreshToken };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  // Request reset password service
  async sendResetPasswordEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      const resetPasswordToken = jwt.sign({ email: user.email }, JWT_REFRESH_SECRET, {
        expiresIn: '10h'
      });
      user['resetPasswordToken'] = resetPasswordToken;

      await EmailService.sendEmail([user.email], EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD, {
        username: user.name,
        link: `${process.env.CLIENT_URL}/users/reset-password?token=${resetPasswordToken}`
      });

      await UserModel.update({ email }, { resetPasswordToken });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createUser(userData) {
    try {
      const existingUser = await UserModel.findOne({ 
        $or: [
          { email: userData.email },
          { phoneNumber: userData.phoneNumber }
        ]
      });
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

      const VerifyAccountToken = jwt.sign({ email: userData.email }, JWT_REFRESH_SECRET, {
        expiresIn: '10h'
      });

      userData['verifyPasswordToken'] = VerifyAccountToken;


        await EmailService.sendEmail([userData.email], EMAIL_TEMPLATES_DETAILS.VERIFY_EMAIL, {
        username: userData.name,
        link: `${process.env.CLIENT_URL}/verify-account?token=${VerifyAccountToken}`
      });
    


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
        throw new ErrorResponse('User not found', StatusCodes.FORBIDDEN, 'USER_NOT_FOUND');
      }

      const accessToken = await generateToken(user, JWT_SHORT_EXPIRY);
      const newRefreshToken = await generateRefreshToken(user, JWT_LONG_EXPIRY);

      return { user, accessToken, newRefreshToken };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async verifyAccount(token) {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      const email = _.get(decoded, 'email', null);
      if (!email) {
        throw new ErrorResponse(
          'Invalid refresh token',
          StatusCodes.FORBIDDEN,
          'INVALID_REFRESH_TOKEN'
        );
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ErrorResponse('User not found', StatusCodes.FORBIDDEN, 'USER_NOT_FOUND'); //!TODO
      }

      const updatedUser = UserModel.update({ email }, { isVerified: true });

      user.resetPasswordToken = null;

      return updatedUser;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async generateForgetMyPasswordTokenLink(body) {
    const { email  } = body;

    if (!email) {
      throw new ErrorResponse('Email not found', StatusCodes.FORBIDDEN, 'EMAIL_NOT_FOUND');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ErrorResponse('User not found', StatusCodes.FORBIDDEN, 'USER_NOT_FOUND');
    }

    const resetPasswordToken = jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '10h' });

    await UserModel.update({ email }, { resetPasswordToken });

    await EmailService.sendEmail([email], EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD, {
      username: user.name,
      link: `${process.env.CLIENT_URL}/reset-password?token=${resetPasswordToken}`
    });

    return { message: 'Reset password link sent successfully' };
  }

  async verifyTokenAndResetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      const email = _.get(decoded, 'email', null);


      if (!email) {
        throw new ErrorResponse('Invalid reset token', StatusCodes.FORBIDDEN);
      }

      const user = await UserModel.findOne({ email });
      if (!user || user.resetPasswordToken !== token) {
        throw new ErrorResponse('Invalid or expired reset token', StatusCodes.FORBIDDEN);
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password in the database and remove the reset token
      await UserModel.update({ email }, { password: hashedPassword, resetPasswordToken: null });

      return { message: 'Password updated successfully' };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  // ADMIN services

  async listUsers(query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);

    try {
      _query.role = USER_ROLES.CLIENT;
      const users = await UserModel.find(_query, options);
      return { users, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getUser(id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }
      return user;
    }
    catch (e) {
      logger.error(e);
      throw e;
    }

}

async updateUser(id, body) {
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new ErrorResponse(
        usersErrors.USER_NOT_FOUND.message,
        BAD_REQUEST,
        usersErrors.USER_NOT_FOUND.code
      );
    }

    const updatedUser = await UserModel.update({ _id: id }, body);
    return updatedUser;
  } catch (e) {
    logger.error(e);
    throw e;
  }


}


async deleteUser(id) {
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new ErrorResponse(
        usersErrors.USER_NOT_FOUND.message,
        BAD_REQUEST,
        usersErrors.USER_NOT_FOUND.code
      );
    }

    return await UserModel.delete({ _id: id });
  } catch (e) {
    logger.error(e);
    throw e;
  }

}

}
export default new UserService();
