export const CONTROLLERS = {
  LIST_PRODUCTS_TYPES: 'listProductsTypes',
  GET_PRODUCT_TYPE: 'getProductType',
  CREATE_PRODUCT_TYPE: 'createProductType',
  UPDATE_PRODUCT_TYPE: 'updateProductType',
  DELETE_PRODUCT_TYPE: 'deleteProductType',
  APPROVE_PRODUCT_TYPE: 'approveProductType',
  DECLINE_PRODUCT_TYPE: 'declineProductType'
};

const PENDING = 'PENDING';
const DECLINE = 'DECLINE';
const APPROVED = 'APPROVED';

export const PRODUCT_STATUS = {
  PENDING,
  DECLINE,
  APPROVED
};

export const productsTypesError = Object.freeze({
  PRODUCT_TYPE_NOT_FOUND: {
    message: 'Product type not found',
    code: 101
  },
  PRODUCT_TYPE_ALREADY_EXISTS: {
    message: 'Product type already exists',
    code: 102
  },
  PRODUCT_TYPE_NOT_CREATED: {
    message: 'Product type not created',
    code: 103
  },
  PRODUCT_TYPE_NOT_UPDATED: {
    message: 'Product type not updated',
    code: 104
  },
  PRODUCT_TYPE_NOT_DELETED: {
    message: 'Product type not deleted',
    code: 105
  },
  PRODUCT_TYPE_NOT_FOUND: {
    message: 'Product type not found',
    code: 106
  },
  PRODUCT_TYPE_NOT_PENDING: {
    message: 'product type not pending',
    code: 107
  }
});
