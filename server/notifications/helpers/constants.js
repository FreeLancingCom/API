export const CONTROLLERS = {
  LIST_NOTIFICATIONS: 'notifications:list',
  GET_NOTIFICATION: 'notifications:get',
  COUNT_NOTIFICATIONS: 'notifications:count',
  CREATE_NOTIFICATION: 'notifications:create',
  DELETE_NOTIFICATION: 'notifications:delete',
  CLEAR_NOTIFICATIONS: 'notifications:clear'
};

export const notificationsErrors = Object.freeze({
  NOTIFICATION_NOT_FOUND: {
    code: 100,
    message: 'Notification not found'
  },
  USERS_NOT_FOUND: {
    code: 101,
    message: 'Users not found'
  },
  ADVERTISEMENT_NOT_FOUND: {
    code: 102,
    message: 'Advertisement not found'
  }
});
