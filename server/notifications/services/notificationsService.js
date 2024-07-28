import NotificationModel from '../model/index.js';
import usersService from '../../users/services/usersService.js';
// import advertisementService from '../../advertisements/services/advertisementService.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { notificationsErrors } from '../helpers/constants.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

const { BAD_REQUEST } = StatusCodes;

class NotificationService {
  async listNotifications(userId, query) {
    try {
      const { page, limit, skip, sortBy, sortOrder, ..._query } = query;

      const options = getPaginationAndSortingOptions(query);
      let notifications = await NotificationModel.find(
        {
          targets: {
            $elemMatch: {
              userId
            }
          }
        },
        options
        // ad['adId'],
      );

      const notificationIds = notifications.map(notification => notification._id);

      await NotificationModel.updateMany(
        { _id: { $in: notificationIds } },
        { $set: { 'targets.$[elem].read': true } },
        { arrayFilters: [{ 'elem.userId': userId }] }
      );
      return { notifications, options, total: notifications.length };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getNotification(notificationId, options) {
    try {
      const notification = await NotificationModel.findOne({ _id: notificationId }, options);

      if (!notification)
        throw new ErrorResponse(
          notificationsErrors.NOTIFICATION_NOT_FOUND.message,
          BAD_REQUEST,
          notificationsErrors.NOTIFICATION_NOT_FOUND.code
        );

      return notification;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countUnreadNotifications(userId, options) {
    try {
      const count = await NotificationModel.count({
        targets: { $elemMatch: { userId, read: false } }
      });
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countNotifications(userId, options) {
    try {
      const count = await NotificationModel.count({ targets: { $elemMatch: { userId } } });
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createNotification(userId, notificationData) {
    notificationData['sender'] = userId;
    //prevent the sender to send notification to himself
    // notificationData['targets'] = notificationData['targets'].filter(target => target !== userId);
    try {
      if (notificationData['targets']) {
        const usersCount = await usersService.countUsers({
          _id: { $in: notificationData['targets'] }
        });

        if (!usersCount || usersCount !== notificationData['targets'].length)
          throw new ErrorResponse(
            notificationsErrors.USERS_NOT_FOUND.message,
            BAD_REQUEST,
            notificationsErrors.USERS_NOT_FOUND.code
          );
      }

      // if (notificationData['contentType'] === 'ad') {
      //   const advertisement = await advertisementService.getAdvertisement({
      //     _id: notificationData['adId']
      //   });
      //   if (!advertisement)
      //     throw new ErrorResponse(
      //       notificationsErrors.ADVERTISEMENT_NOT_FOUND.message,
      //       BAD_REQUEST,
      //       notificationsErrors.ADVERTISEMENT_NOT_FOUND.code
      //     );
      // }

      notificationData['targets'] = notificationData['targets'].map(userId => ({ userId }));

      const notification = await NotificationModel.create(notificationData);
      return notification;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async clearNotifications(userId, query) {
    try {
      const count = await this.countNotifications(userId);

      const iterations = Math.ceil(count / 100);

      for (let i = 1; i <= iterations; i++) {
        const options = getPaginationAndSortingOptions({
          page: i,
          limit: 100
        });

        const notifications = await NotificationModel.find(
          { targets: { $elemMatch: { userId } } },
          options
        );

        const notificationIds = notifications.map(notification => notification._id);

        await NotificationModel.updateMany(
          { _id: { $in: notificationIds } },
          { $pull: { targets: { userId } } }
        );

        await NotificationModel.deleteMany({
          _id: { $in: notificationIds },
          targets: { $exists: true, $size: 0 }
        });
      }

      return;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteNotification(notificationId) {
    try {
      const notification = await NotificationModel.findOne({ _id: notificationId });
      if (!notification)
        throw new ErrorResponse(
          notificationsErrors.NOTIFICATION_NOT_FOUND.message,
          BAD_REQUEST,
          notificationsErrors.NOTIFICATION_NOT_FOUND.code
        );
      return await NotificationModel.delete({ _id: notificationId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new NotificationService();
