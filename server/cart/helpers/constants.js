export const CONTROLLERS = {
  LIST_CART: 'cart:list',
  CREATE_CART_PRODUCT: 'cart:add-product',
  CREATE_CART_PACKAGE: 'cart:add-package',
  UPDATE_CART_PRODUCT: 'cart:update-product',
  UPDATE_CART_PACKAGE: 'cart:update-package',
  DELETE_CART_PRODUCT: 'cart:remove-product',
  DELETE_CART_PACKAGE: 'cart:remove-package',
  INCREASE_PRODUCT_QUANTITY: 'INCREASE_PRODUCT_QUANTITY',
  DECREASE_PRODUCT_QUANTITY: 'DECREASE_PRODUCT_QUANTITY',
  INCREASE_PACKAGE_QUANTITY: 'INCREASE_PACKAGE_QUANTITY',
  DECREASE_PACKAGE_QUANTITY: 'DECREASE_PACKAGE_QUANTITY',
  CLEAR_CART: 'cart:clear'
};

export const cartError = Object.freeze({
  CART_NOT_FOUND: {
    code: 'CART_100',
    message: 'Cart not found'
  },
  CART_CREATION_FAILED: {
    code: 'CART_101',
    message: 'Cart creation failed'
  },
  CART_UPDATE_FAILED: {
    code: 'CART_102',
    message: 'Cart update failed'
  },
  CART_DELETE_FAILED: {
    code: 'CART_103',
    message: 'Cart deletion failed'
  },
  CART_RETRIEVAL_FAILED: {
    code: 'CART_104',
    message: 'Cart retrieval failed'
  },
  CART_CLEAR_FAILED: {
    code: 'CART_105',
    message: 'Cart clear operation failed'
  },
  CART_ITEM_NOT_FOUND: {
    code: 'CART_106',
    message: 'Item not found in cart'
  },
  PRODUCT_ALREADY_IN_CART: {
    code: 'CART_107',
    message: 'Product already in cart'
  },
  PACKAGE_ALREADY_IN_CART: {
    code: 'CART_108',
    message: 'Package already in cart'
  }
});
