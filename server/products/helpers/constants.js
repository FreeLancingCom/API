export const CONTROLLERS = {
  LIST_PRODUCTS: 'admin:list',
  GET_PRODUCT: 'admin:get',
  CREATE_PRODUCT: 'admin:create',
  UPDATE_PRODUCT: 'admin:update',
  DELETE_PRODUCT: 'admin:delete',
  COUNT_PRODUCTS: 'admin:count'
};

export const productsErrors = Object.freeze({
  PRODUCT_NOT_FOUND: {
    code: 100,
    message: 'product not found'
  },
  INSUFFICIENT_STOCK_WITH_ID: {
    message: id => `Requested quantity for product with  ${id} exceeds available stock.`,
    code: 101
  },
  INSUFFICIENT_STOCK: {
    message: `Requested quantity for some of products exceeds available stock.`,
    code: 102
  },
  MAINTENANCE_CENTER_NOT_FOUND: {
    message: 'Maintenance center not found',
    code: 103
  },
  NO_PRODUCTS_FOUND_FOR_MAINTENANCE_CENTER: {
    message: 'No products found for this  maintenance center',
    code: 104
  },
  PRODUCT_TYPE_NOT_FOUND: {
    message: 'Product type not found',
    code: 105
  },
  PRODUCT_ALREADY_EXISTS: {
    message: 'Product already exists',
    code: 106
  }
});
