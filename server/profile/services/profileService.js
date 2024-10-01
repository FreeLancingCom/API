import UserModel from '../../users/model/index.js';
import logger from '../../../common/utils/logger/index.js';

import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { profileError  , BAD_REQUEST} from '../helper/constant.js';

class profileService {
  async getProfile(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId } , {resetPasswordToken : 0 , verifyPasswordToken : 0});
      if (!user) {
        throw new ErrorResponse(
          profileError.PROFILE_NOT_FOUND.message,
          BAD_REQUEST,
          profileError.PROFILE_NOT_FOUND.code
        );
      }

      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProfile(userId, body) {
    try {
      const isUserExist = await UserModel.findOne({ _id: userId });

      if (!isUserExist) {
        throw new ErrorResponse(
          profileError.PROFILE_NOT_FOUND.message,
          BAD_REQUEST,
          profileError.PROFILE_NOT_FOUND.code
        );
      }

      const user = await UserModel.update({ _id: userId }, body);

      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new profileService();
