export const CONTROLLERS = {
  LIST_SERVICES: 'services:list',
  LIST_SERVICE_BY_CLIENT: 'services:listByClient',
  GET_SERVICE: 'services:get',
  GET_SERVICE_BY_CLIENT: 'services:getByClient',
  COUNT_SERVICES: 'services:count',
  CREATE_SERVICE: 'services:create',
  UPDATE_SERVICE: 'services:update',
  DELETE_SERVICES: 'services:delete'
};

export const servicesErrors = Object.freeze({
  SERVICE_TYPE_NOT_FOUND: {
    message: 'Service type not found',
    code: 100
  },
  SERVICE_ALREADY_EXISTS: {
    message: 'Service already exists',
    code: 101
  }
});

