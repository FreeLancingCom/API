export const CONTROLLERS = {
  LIST_ADDRESSES: 'admin_users:list',
  GET_ADDRESS: 'admin_users:get',
  CREATE_ADDRESS: 'admin:create',
  UPDATE_ADDRESS: 'admin:update',
  DELETE_ADDRESS: 'admin:delete',
  COUNT_ADDRESSES: 'admin_users:count'
};

export const addressError = Object.freeze({
  ADDRESS_NOT_FOUND: {
    code: 101,
    message: 'Address not found'
  },
  ADDRESS_ALREADY_EXISTS: {
    code: 102,
    message: 'Address already exists'
  },
  ADDRESS_CREATION_FAILED: {
    code: 103,
    message: 'Address creation failed'
  },
  ADDRESS_UPDATE_FAILED: {
    code: 104,
    message: 'Address update failed'
  },
  ADDRESS_DELETE_FAILED: {
    code: 105,
    message: 'Address delete failed'
  }
});
