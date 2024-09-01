export const CONTROLLER = {
  CREATE_CITY: 'admin:create',
  LIST_CITIES: 'admin_users:list',
  GET_CITY: 'admin_users:get',
  UPDATE_CITY: 'admin:update',
  DELETE_CITY: 'admin:delete',
  COUNT_CITIES: 'admin_users:count'
};

export const cityErrors = Object.freeze({
  CITY_NOT_FOUND: {
    code: 100,
    message: 'City not found'
  },
  CITY_ALREADY_EXISTS: {
    code: 101,
    message: 'City already exists'
  },
  CITY_NOT_CREATED: {
    code: 102,
    message: 'City not created'
  },
  CITY_NOT_UPDATED: {
    code: 103,
    message: 'City not updated'
  },
  CITY_NOT_DELETED: {
    code: 104,
    message: 'City not deleted'
  }
});
