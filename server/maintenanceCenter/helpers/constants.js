export const CONTROLLERS = {
  LIST_MAINTENANCE_CENTERS: 'maintenanceCenters:list',
  GET_MAINTENANCE_CENTER: 'maintenanceCenters:get',
  COUNT_MAINTENANCE_CENTERS: 'maintenanceCenters:count',
  CREATE_MAINTENANCE_CENTER: 'maintenanceCenters:create',
  UPDATE_MAINTENANCE_CENTER: 'maintenanceCenters:update',
  DELETE_MAINTENANCE_CENTERS: 'maintenanceCenters:delete'
};

export const maintenanceCentersErrors = Object.freeze({
  MAINTENANCE_CENTER_NOT_FOUND: {
    code: 300,
    message: 'Center not found'
  }
});
