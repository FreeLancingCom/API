export const CONTROLLERS = {
  LIST_PACKAGES: 'listPackages',
  GET_PACKAGE: 'getPackage',
  CREATE_PACKAGE: 'createPackage',
  UPDATE_PACKAGE: 'updatePackage',
  DELETE_PACKAGE: 'deletePackage'
};

export const packageErrors = {
  PACKAGE_NOT_FOUND: {
    code: 404,
    message: 'Package not found'
  },
  PACKAGE_ALREADY_EXISTS: {
    code: 400,
    message: 'Package already exists'
  },
  PACKAGE_NOT_CREATED: {
    code: 400,
    message: 'Package not created'
  },
  PACKAGE_NOT_UPDATED: {
    code: 400,
    message: 'Package not updated'
  },
  PACKAGE_NOT_DELETED: {
    code: 400,
    message: 'Package not deleted'
  },
  PACKAGE_NOT_LISTED: {
    code: 400,
    message: 'Packages not listed'
  }
};