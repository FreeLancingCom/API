export const CONTROLLERS = {
    LIST_ADDRESSES: 'addresses:list',
    GET_ADDRESS: 'addresses:get',
    CREATE_ADDRESS: 'addresses:create',
    UPDATE_ADDRESS: 'addresses:update',
    DELETE_ADDRESS: 'addresses:delete',
  };
  
  export const addressError = Object.freeze({
      ADDRESS_NOT_FOUND: {
        code: 'ADDRESSES_100',
        message: 'Address not found'
      },
      ADDRESS_CREATION_FAILD: {
        code: 'ADDRESSES_101',
        message: 'Address creation failed'
      },
      ADDRESS_UPDATE_FAILD: {
        code: 'ADDRESSES_102',
        message: 'Address update failed'
      },
      ADDRESS_DELETE_FAILD: {
        code: 'ADDRESSES_103',
        message: 'Address delete failed'
      },
      ADDRESS_RETREIVAL_FAILD: {
        code: 'ADDRESSES_104',
        message: 'Address retreival failed'
      },
      ADDRESS_ALREADY_EXISTS: {
        code: 'ADDRESSES_105',
        message: 'Address already exists'
      } 
    });