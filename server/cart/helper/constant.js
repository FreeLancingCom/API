export const CONTROLLERS = {
  LIST_CART: 'cart:list', // Lists the contents of the cart (products and packages)
  CREATE_CART_PRODUCT: 'cart:add-product', // Adds a product to the cart
  CREATE_CART_PACKAGE: 'cart:add-package', // Adds a package to the cart
  UPDATE_CART_PRODUCT: 'cart:update-product', // Updates quantity or details of a product in the cart
  UPDATE_CART_PACKAGE: 'cart:update-package', // Updates a package in the cart
  DELETE_CART_PRODUCT: 'cart:remove-product', // Removes a product from the cart
  DELETE_CART_PACKAGE: 'cart:remove-package', // Removes a package from the cart
  CLEAR_CART: 'cart:clear', 
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
  }
});

export const productError = Object.freeze({
  PRODUCT_NOT_FOUND: {
      code: 'PRODUCT_100',
      message: 'Product not found'
  },
  PRODUCT_CREATION_FAILED: {
      code: 'PRODUCT_101',
      message: 'Product creation failed'
  },
  PRODUCT_UPDATE_FAILED: {
      code: 'PRODUCT_102',
      message: 'Product update failed'
  },
  PRODUCT_DELETE_FAILED: {
      code: 'PRODUCT_103',
      message: 'Product deletion failed'
  },
  PRODUCT_ALREADY_IN_CART: {
      code: 'PRODUCT_104',
      message: 'Product already exists in cart'
  },
  PRODUCT_QUANTITY_EXCEEDED: {
      code: 'PRODUCT_105',
      message: 'Product quantity exceeds available stock'
  }
});

export const packageError = Object.freeze({
  PACKAGE_NOT_FOUND: {
      code: 'PACKAGE_100',
      message: 'Package not found'
  },
  PACKAGE_CREATION_FAILED: {
      code: 'PACKAGE_101',
      message: 'Package creation failed'
  },
  PACKAGE_UPDATE_FAILED: {
      code: 'PACKAGE_102',
      message: 'Package update failed'
  },
  PACKAGE_DELETE_FAILED: {
      code: 'PACKAGE_103',
      message: 'Package deletion failed'
  },
  PACKAGE_ALREADY_IN_CART: {
      code: 'PACKAGE_104',
      message: 'Package already exists in cart'
  },
  PACKAGE_INVALID: {
      code: 'PACKAGE_105',
      message: 'Invalid package'
  }
});
 
  
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
