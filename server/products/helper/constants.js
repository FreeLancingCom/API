export const CONTROLLERS = {
  LIST_PRODUCTS: 'admin:list',
  GET_PRODUCT: 'admin:get',
  CREATE_PRODUCT: 'admin:create',
  UPDATE_PRODUCT: 'admin:update',
  DELETE_PRODUCT: 'admin:delete',
  COUNT_PRODUCTS: 'admin:count'
};

export const PRODUCT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const productsErrors = Object.freeze({
  PRODUCT_NOT_FOUND: {
    code: 103,
    message: 'product not found'
  },
  INSUFFICIENT_STOCK_WITH_ID: {
    message: id => `Requested quantity for product with  ${id} exceeds available stock.`,
    code: 104
  },
  INSUFFICIENT_STOCK: {
    message: `Requested quantity for some of products exceeds available stock.`,
    code: 105
  },
  MAINTENANCE_CENTER_NOT_FOUND: {
    message: 'Maintenance center not found',
    code: 106
  },
  NO_PRODUCTS_FOUND_FOR_MAINTENANCE_CENTER: {
    message: 'No products found for this  maintenance center',
    code: 107
  }
});
