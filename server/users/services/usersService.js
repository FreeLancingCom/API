import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../model/index.js';
import { usersErrors } from '../helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { generateToken , generateRefreshToken } from '../../../common/utils/jwt/index.js';
import { JWT_LONG_EXPIRY, JWT_SHORT_EXPIRY , JWT_REFRESH_SECRET } from '../../../config/env/index.js';
import { EMAIL_TEMPLATES_DETAILS } from '../../email/helper/constant.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import EmailService from "../../email/service/emailService.js"

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

  // Request reset password service
  async sendResetPasswordEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ErrorResponse(usersErrors.USER_NOT_FOUND.message, BAD_REQUEST, usersErrors.USER_NOT_FOUND.code);
      }

      const resetPasswordToken = jwt.sign({ email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '10h' });
      user['resetPasswordToken'] = resetPasswordToken;


      await EmailService.sendEmail([user.email], EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD, {
        username: user.name,
        link: `http://localhost:3005/api/v1/users/reset-password?token=${resetPasswordToken}`,
      });

      await UserModel.update({ email }, { resetPasswordToken });

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


     

      const VerifyAccountToken = jwt.sign({ email: userData.email }, JWT_REFRESH_SECRET, { expiresIn: '10h' });

      userData['verifyPasswordToken'] = VerifyAccountToken;

    


      await EmailService.sendEmail([userData.email], EMAIL_TEMPLATES_DETAILS.VERIFY_EMAIL, {
        username: userData.name,
        link: `http://localhost:3005/api/v1/users/verify-account?token=${VerifyAccountToken}`,
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





// async sendRestPasswordEmail(email) {

//   try {
//     const user = await UserModel.findOne({email});
//     if (!user) {
//       throw new ErrorResponse(
//         usersErrors.USER_NOT_FOUND.message,
//         BAD_REQUEST,
//         usersErrors.USER_NOT_FOUND.code
//       );
//     }

//     const resetPasswordToken = jwt.sign({ pass : user.password }, JWT_REFRESH_SECRET, { expiresIn: '10h' });


//     user['resetPasswordToken'] = resetPasswordToken;

//     await EmailService.sendEmail(
//       [user.email], EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD,
//       { username: user.name,
//         link: `http://localhost:3005/api/v1/users/reset-password?token=${resetPasswordToken}` });

    

//   } catch (e) {
//     logger.error(e);
//     throw e;
//   }


//   }


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
        throw new ErrorResponse(
          'User not found',
          StatusCodes.FORBIDDEN,
          'USER_NOT_FOUND'
        );
      }



      const updatedUser =  UserModel.update({ email }, {isVerified : true});

      user.resetPasswordToken = null;

      return updatedUser;



    } catch (error) {
      logger.error(error);
      throw error;
    }





  }



  


  async generateForgetMyPasswordTokenLink(body) {
    const { email } = body;
  
    if (!email) {
      throw new ErrorResponse('Email not found', StatusCodes.FORBIDDEN, 'EMAIL_NOT_FOUND');
    }
  
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      throw new ErrorResponse('User not found', StatusCodes.FORBIDDEN, 'USER_NOT_FOUND');
    }
  
    const resetPasswordToken = jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '10h' });
    
    // Update user's resetPasswordToken in the database
    await UserModel.update({ email }, { resetPasswordToken });
  
    // Send password reset email
    await EmailService.sendEmail([email], EMAIL_TEMPLATES_DETAILS.RESET_PASSWORD, {
      username: user.name,
      link: `http://localhost:3005/api/v1/users/reset-password?token=${resetPasswordToken}`,
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
  


  


}











 







export default new UserService();