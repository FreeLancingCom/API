export const CONTROLLERS = {
  LIST_ROAD_SERVICES: 'listRoadServices',
  GET_ROAD_SERVICE: 'getRoadService',
  CREATE_ROAD_SERVICE: 'createRoadService',
  UPDATE_ROAD_SERVICE: 'updateRoadService',
  DELETE_ROAD_SERVICE: 'deleteRoadService',
  COUNT_ROAD_SERVICES: 'countRoadServices'
};

export const roadServicesErrors = Object.freeze({
  ROAD_SERVICE_NOT_FOUND: {
    message: 'Road service not found',
    code: 100
  },
  ROAD_SERVICE_ALREADY_EXISTS: {
    message: 'Road service already exists',
    code: 101
  },
  ROAD_SERVICE_CREATION_FAILED: {
    message: 'Road service creation failed',
    code: 102
  },
  ROAD_SERVICE_UPDATE_FAILED: {
    message: 'Road service update failed',
    code: 103
  },
  ROAD_SERVICE_DELETE_FAILED: {
    message: 'Road service delete failed',
    code: 104
  },
  ROAD_SERVICE_COUNT_FAILED: {
    message: 'Road service count failed',
    code: 105
  }
});
