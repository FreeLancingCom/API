export const CONTROLLERS = {
  LIST_SERVICE_TEMPLATES_BY_ADMIN: 'serviceTemplate:listAll',
  LIST_SERVICE_TEMPLATES_BY_PROVIDER: 'serviceTemplate:listForProvider',
  GET_SERVICE_TEMPLATE: 'serviceTemplate:get',
  COUNT_SERVICE_TEMPLATES: 'serviceTemplate:count',
  CREATE_SERVICE_TEMPLATE: 'serviceTemplate:create',
  UPDATE_SERVICE_TEMPLATE_ADMIN: 'serviceTemplate:updateByAdmin',
  UPDATE_SERVICE_TEMPLATE_PROVIDER: 'serviceTemplate:updateByProvider',
  DELETE_SERVICE_TEMPLATES: 'serviceTemplate:delete',
  REQUEST_SERVICE_TEMPLATE: 'serviceTemplate:request',
  CLONE_SERVICE_TEMPLATE_FOR_PROVIDER: 'serviceTemplate:cloneForProvider'
};

const PENDING = 'PENDING';
const DECLINED = 'DECLINED';
const APPROVED = 'APPROVED';

export const serviceTemplateStatuses = Object.freeze({
  PENDING,
  APPROVED,
  DECLINED
});

export const serviceTemplateErrors = Object.freeze({
  SERVICE_TEMPLATE_NOT_FOUND: {
    code: 900,
    message: 'Service template not found'
  },
  SERVICE_TEMPLATE_ALREADY_EXISTS: {
    code: 901,
    message: 'Service template already exists'
  }
});
