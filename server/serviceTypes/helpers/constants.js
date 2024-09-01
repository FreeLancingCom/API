export const CONTROLLERS = {
  LIST_SERVICES_TYPES: 'listServicesTypes',
  GET_SERVICE_TYPE: 'getServiceType',
  CREATE_SERVICE_TYPE: 'createServiceType',
  UPDATE_SERVICE_TYPE: 'updateServiceType',
  DELETE_SERVICE_TYPE: 'deleteServiceType',
  APPROVE_SERVICE_TYPE: 'approveServiceType',
  DECLINE_SERVICE_TYPE: 'declineServiceType',
  REQUEST_SERVICE_TYPE: 'requestServiceType',
  COUNT_SERVICE_TYPES: 'countServiceTypes'
};

const PENDING = 'PENDING';
const DECLINED = 'DECLINED';
const APPROVED = 'APPROVED';

export const SERVICE_STATUS = {
  PENDING,
  DECLINED,
  APPROVED
};

export const SERVICE_APPROVED = serviceName => `Your service type ${serviceName} has been approved`;
export const SERVICE_DECLINED = serviceName => `Your service type ${serviceName} has been declined`;

export const serviceTypesErrors = Object.freeze({
  SERVICE_TYPE_NOT_FOUND: {
    message: 'Service type not found',
    code: 101
  },
  SERVICE_TYPE_ALREADY_EXISTS: {
    message: 'Service type already exists',
    code: 102
  },
  SERVICE_TYPE_NOT_CREATED: {
    message: 'Service type not created',
    code: 103
  },
  SERVICE_TYPE_NOT_UPDATED: {
    message: 'Service type not updated',
    code: 104
  },
  SERVICE_TYPE_NOT_DELETED: {
    message: 'Service type not deleted',
    code: 105
  },
  SERVICE_TYPE_NOT_PENDING: {
    message: 'Service type not pending',
    code: 107
  },
  SERVICE_TYPE_IS_ALREADY_USED: {
    message: 'Service type is already used by a maintenance center',
    code: 107
  }
});
