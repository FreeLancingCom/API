export const CONTROLLERS = {
  LIST_PRODUCTS_TYPES: 'listProductsTypes',
  GET_PRODUCT_TYPE: 'getProductType',
  CREATE_PRODUCT_TYPE: 'createProductType',
  UPDATE_PRODUCT_TYPE: 'updateProductType',
  DELETE_PRODUCT_TYPE: 'deleteProductType',
  APPROVE_PRODUCT_TYPE: 'approveProductType',
  DECLINE_PRODUCT_TYPE: 'declineProductType',
  REQUEST_PRODUCT_TYPE: 'requestProductType',
  COUNT_PRODUCT_TYPES: 'countProductTypes'
};

const PENDING = 'PENDING';
const DECLINED = 'DECLINED';
const APPROVED = 'APPROVED';

export const PRODUCT_STATUS = {
  PENDING,
  DECLINED,
  APPROVED
};

export const PRODUCT_APPROVED = productName => `Your product ${productName} has been approved`;
export const PRODUCT_DECLINED = productName => `Your product ${productName} has been declined`;

export const productTypesErrors = Object.freeze({
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
  PRODUCT_TYPE_NOT_PENDING: {
    message: 'product type not pending',
    code: 107
  },
  PRODUCT_TYPE_IS_ALREADY_USED: {
    message: 'product type is already used by a maintenance center',
    code: 107
  }
});
