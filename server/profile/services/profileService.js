import UserModel from '../../users/models/index.js';
import notificationsService from '../../notifications/services/notificationsService.js';
import logger from '../../../common/utils/logger/index.js';


class profileService {
  async getProfile(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      const unreadNotifications = await notificationsService.countUnreadNotifications(userId);
      
      return {user, unreadNotifications};
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProfile(userId, body) {
    try {
      const user = await UserModel.update({ _id: userId }, body);
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new profileService();
