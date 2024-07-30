import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/index.js';
import { usersErrors } from '../helpers/constants.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import EmailsService from '../../email/services/emailService.js';
import { EMAIL_TEMPLATES_DETAILS } from '../../email/helpers/constant.js';
import { generateToken } from '../../../common/utils/jwt/index.js';

const { BAD_REQUEST } = StatusCodes;
class UserService {
  async listUsers(query) {
    try {
      const { page, limit, skip, sortBy, sortOrder, ..._query } = query;

      const options = getPaginationAndSortingOptions(query);

      const users = await UserModel.find(_query, options);

      return { users, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getUser(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  //admin login
  async adminLogin(body) {
    try {
      const { email, password } = body;

      const user = await UserModel.findOneAndIncludePassword({ email });
      if (!user || !user.isActive) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      if (user.role === USER_ROLES.CLIENT || user.role === USER_ROLES.PROVIDER)
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ErrorResponse(
          usersErrors.INVALID_CREDENTIALS.message,
          BAD_REQUEST,
          usersErrors.INVALID_CREDENTIALS.code
        );
      }

      const token = await generateToken(user);
      delete user.password;

      return { user, token };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  //user login
  async login(body) {
    try {
      const { email, password } = body;

      const user = await UserModel.findOneAndIncludePassword({ email });
      if (!user || !user.isActive) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      if (user.role !== USER_ROLES.CLIENT && user.role !== USER_ROLES.PROVIDER)
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ErrorResponse(
          usersErrors.INVALID_CREDENTIALS.message,
          BAD_REQUEST,
          usersErrors.INVALID_CREDENTIALS.code
        );
      }

      const token = await generateToken(user);
      delete user.password;

      return { user, token };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createUser(userData, role) {
    try {
      const existingUser = await UserModel.findOne({
        $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }]
      });

      if (existingUser) {
        throw new ErrorResponse(
          usersErrors.USER_ALREADY_EXISTS.message,
          BAD_REQUEST,
          usersErrors.USER_ALREADY_EXISTS.code
        );
      }
      // Validate phone number
      const isValidPhoneNumber = UserService.validatePhoneNumber(userData.phoneNumber);
      if (!isValidPhoneNumber) {
        throw new ErrorResponse(
          usersErrors.INVALID_PHONE_NUMBER.message,
          BAD_REQUEST,
          usersErrors.INVALID_PHONE_NUMBER.code
        );
      }

      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      userData.isVerified = false;
      if (userData.role == USER_ROLES.ADMIN) {
        userData.isVerified = true;
      }

      const _user = await UserModel.create({ ...userData, role });
      const { password, ...user } = _user.toObject();
      const token = await generateToken(user);
      if (user.role == USER_ROLES.CLIENT) {
        await this.generateVerificationCode(user);
      }

      return { user, token };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  static validatePhoneNumber(phoneNumber) {
    const egyptLocalNumberPattern = /^(010|011|012|015)\d{8}$/;

    return egyptLocalNumberPattern.test(phoneNumber);
    // || validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })
  }

  async updateUser(userId, userData) {
    try {
      const existingUser = await UserModel.findOne({ _id: userId });

      if (!existingUser) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      if (userData['phoneNumber']) {
        const isValidPhoneNumber = UserService.validatePhoneNumber(userData.phoneNumber);
        if (!isValidPhoneNumber) {
          throw new ErrorResponse(
            usersErrors.INVALID_PHONE_NUMBER.message,
            BAD_REQUEST,
            usersErrors.INVALID_PHONE_NUMBER.code
          );
        }
      }

      if (userData['password']) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
      }

      const user = await UserModel.update({ _id: userId }, { $set: userData });
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deactivateUser(userId) {
    try {
      const existingUser = await UserModel.findOne({ _id: userId });

      if (!existingUser) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      const user = await UserModel.update({ _id: userId }, { isActive: false });
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteUser(userId) {
    try {
      const existingUser = await UserModel.findOne({ _id: userId });

      if (!existingUser) {
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );
      }

      return UserModel.delete({ _id: userId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  // async getUserProfile(userId) {
  //   try {
  //     const user = await UserModel.findOne({ _id: userId }, {}, [
  //       'wishlist'
  //     ]);
  //     return user;
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }

  async countUsers(query = {}, options) {
    try {
      const usersQuery = { ...query };
      return await UserModel.count(usersQuery);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async generateVerificationCode(user) {
    try {
      const verificationCode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
      const ttl = Date.now() + 3600000; // 1 hour

      const updates = {
        verificationCode: verificationCode,
        verificationCodeTTL: ttl
      };

      console.log('hello')
      const updatedUser = await this.updateUser(user._id, updates);

      await EmailsService.sendEmail(
        [user.email],
        EMAIL_TEMPLATES_DETAILS.VERIFY_EMAIL,
        {
          username: updatedUser.fullName,
          otp: verificationCode
        }
      );
      logger.info(
        `[generateVerificationCode] email sent to ${updatedUser.email}`
      );
      return true;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async verifyEmail(user, body) {
    try {
      const { verificationCode } = body;
      if (!user.verificationCode)
        throw new ErrorResponse(
          usersErrors.REQUEST_VERIFICATION_CODE.message,
          BAD_REQUEST,
          usersErrors.REQUEST_VERIFICATION_CODE.code
        );

      if (user.verificationCode != verificationCode)
        throw new ErrorResponse(
          usersErrors.WRONG_VERIFICATION_CODE.message,
          BAD_REQUEST,
          usersErrors.WRONG_VERIFICATION_CODE.code
        );

      if (user.verificationCodeTTL < Date.now())
        throw new ErrorResponse(
          usersErrors.VERIFICATION_CODE_EXPIRED.message,
          BAD_REQUEST,
          usersErrors.VERIFICATION_CODE_EXPIRED.code
        );

      const updates = {
        isVerified: true,
        $unset: {
          verificationCode: 1,
          verificationCodeTTL: 1
        }
      };
      const updatedUser = await UserModel.update({ _id: user._id }, updates);
      return updatedUser;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async resetPassword(body) {
    try {
      const { email } = body;
      const user = await UserModel.findOne({ email });
      if (!user)
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );

      const resetPasswordCode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
      const ttl = Date.now() + 3600000; // 1 hour

      const updates = {
        resetPasswordCode,
        resetPasswordCodeTTL: ttl
      };
      const updatedUser = await UserModel.update({ _id: user._id }, updates);

      await EmailsService.sendEmail(
        [user.email],
        EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD,
        {
          username: updatedUser.fullName,
          otp: resetPasswordCode
        }
      );
      logger.info(`[resetPassword] email sent to ${updatedUser.email}`);

      return true;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async verifyResetPasswordCode(body) {
    try {
      const { resetPasswordCode, email } = body;
      const user = await UserModel.findOneAndIncludeOTP({ email });
      if (!user)
        throw new ErrorResponse(
          usersErrors.USER_NOT_FOUND.message,
          BAD_REQUEST,
          usersErrors.USER_NOT_FOUND.code
        );

      if (!user.resetPasswordCode)
        throw new ErrorResponse(
          usersErrors.REQUEST_VERIFICATION_CODE.message,
          BAD_REQUEST,
          usersErrors.REQUEST_VERIFICATION_CODE.code
        );

      if (user.resetPasswordCode != resetPasswordCode)
        throw new ErrorResponse(
          usersErrors.WRONG_RESET_PASSWORD_CODE.message,
          BAD_REQUEST,
          usersErrors.WRONG_RESET_PASSWORD_CODE.code
        );

      if (user.resetPasswordCodeTTL < Date.now())
        throw new ErrorResponse(
          usersErrors.VERIFICATION_CODE_EXPIRED.message,
          BAD_REQUEST,
          usersErrors.VERIFICATION_CODE_EXPIRED.code
        );

      const updates = {
        $unset: {
          resetPasswordCode: 1,
          resetPasswordCodeTTL: 1
        }
      };
      const updatedUser = await UserModel.update({ _id: user._id }, updates);
      const token = await generateToken(updatedUser);

      return token;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new UserService();
