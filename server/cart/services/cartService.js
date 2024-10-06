import cartModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { cartError } from '../helpers/constants.js';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

import productService from '../../products/services/productService.js';
import packageService from '../../package/services/packageService.js';
import { productsErrors } from '../../products/helpers/constants.js';
import { packageErrors } from '../../package/helpers/constants.js';
import Fuse from 'fuse.js';

class CartService {
  async listCart(query, userId) {
    const { limit, page, sort, sortBy, search, minPrice, maxPrice, ..._query } = query;
    if (minPrice || maxPrice) {
      _query['price.finalPrice'] = {};
      if (minPrice) {
        _query['price.finalPrice'].$gte = minPrice;
      }
      if (maxPrice) {
        _query['price.finalPrice'].$lte = maxPrice;
      }
    }

    const options = getPaginationAndSortingOptions(query);
    _query['userId'] = userId;
    let carts = await cartModel.find(_query, options, {});
    const count = await cartModel.countDocuments(_query);

    if (search) {
      const fuse = new Fuse(carts, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.3
      });
      carts = fuse.search(search).map(result => result.item);
    }

    return {
      carts,
      options: {
        ...options,
        count
      }
    };
  }

  async AddProductToCart(productId, quantity, userId) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);

        if (index > -1) {
          cart.products[index].quantity += quantity;
          const canAddToCart = await productService.checkAvailableQuantity(
            cart.products[index].quantity,
            productId
          );
          if (!canAddToCart) {
            throw new ErrorResponse(
              productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(product),
              BAD_REQUEST,
              productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
            );
          }
          cart.products[index].totalPrice =
            cart.products[index].quantity * product.price.finalPrice;
        } else {
          const canAddToCart = await productService.checkAvailableQuantity(quantity, productId);
          if (!canAddToCart) {
            throw new ErrorResponse(
              productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(product),
              BAD_REQUEST,
              productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
            );
          }

          cart.products.push({
            productId,
            quantity,
            totalPrice: quantity * product.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart); 
        await cartModel.update({ userId }, cart);
      } else {
        const canAddToCart = productService.checkAvailableQuantity(quantity, productId);
        if (!canAddToCart) {
          throw new ErrorResponse(
            productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(product),
            BAD_REQUEST,
            productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
          );
        }
        cart = await cartModel.create({
          userId,
          products: [{ productId, quantity, totalPrice: quantity * product.price.finalPrice }],
          totalPrice: quantity * product.price.finalPrice
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async AddPackageToCart(packageId, userId, quantity) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);

        if (index > -1) {
          cart.packages[index].quantity += quantity;
          const canAddThatQuantity = await packageService.checkAvailableQuantity(
            cart.packages[index].quantity,
            packageId
          );
          if (!canAddThatQuantity) {
            throw new ErrorResponse(
              packageErrors.INSUFFICIENT_STOCK_WITH_ID.message(Package),
              BAD_REQUEST,
              packageErrors.INSUFFICIENT_STOCK_WITH_ID.code
            );
          }
          cart.packages[index].totalPrice =
            cart.packages[index].quantity * Package.price.finalPrice;
        } else {
          const canAddToCart = await packageService.checkAvailableQuantity(quantity, packageId);
          if (!canAddToCart) {
            throw new ErrorResponse(
              packageErrors.INSUFFICIENT_STOCK_WITH_ID.message(Package),
              BAD_REQUEST,
              packageErrors.INSUFFICIENT_STOCK_WITH_ID.code
            );
          }

          cart.packages.push({
            packageId,
            quantity,
            totalPrice: quantity * Package.price.finalPrice
          });
        }

        cart.totalPrice = this.calculateTotalPrice(cart); 
        await cartModel.update({ userId }, cart);
      } else {
        const canAddToCart = packageService.checkAvailableQuantity(quantity, packageId);
        if (!canAddToCart) {
          throw new ErrorResponse(
            packageErrors.INSUFFICIENT_STOCK_WITH_ID.message(Package),
            BAD_REQUEST,
            packageErrors.INSUFFICIENT_STOCK_WITH_ID.code
          );
        }
        cart = await cartModel.create({
          userId,
          packages: [{ packageId, quantity, totalPrice: quantity * Package.price.finalPrice }],
          totalPrice: quantity * Package.price.finalPrice 
        });
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increaseProductQuantity(productId, userId) {
    return this.AddProductToCart(productId, 1, userId);
  }

  async decreaseProductQuantity(productId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index === -1 || cart.products[index].quantity <= 1) {
        throw new ErrorResponse(
          productsErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          productsErrors.INVALID_QUANTITY.code
        );
      }

      cart.products[index].quantity -= 1;
      cart.products[index].totalPrice =
        cart.products[index].quantity *
        (await productService.getProduct(productId)).price.finalPrice;
      cart.totalPrice = this.calculateTotalPrice(cart); 
      await cartModel.update({ userId }, cart);

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removeProductFromCart(productId, userId) {
    try {

      
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.products.findIndex(p => p.productId == productId);
      if (index > -1) {
        cart.products.splice(index, 1); 
        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cartModel.update({ userId }, cart);
      }

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async removePackageFromCart(packageId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }

      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index > -1) {
        cart.packages.splice(index, 1); 
        cart.totalPrice = this.calculateTotalPrice(cart); 
        return await cartModel.update({ userId }, cart);
      }

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProductInCart(productId, userId, newQuantity, newPrice) {
    try {
      const product = await productService.getProduct(productId);
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.products.findIndex(p => p.productId == productId);
        if (index > -1) {
          if (newQuantity) {
            const canUpdateQuantity = await productService.checkAvailableQuantity(
              newQuantity,
              productId
            );
            if (!canUpdateQuantity) {
              throw new ErrorResponse(
                productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(product),
                BAD_REQUEST,
                productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
              );
            }
            cart.products[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.products[index].totalPrice = cart.products[index].quantity * newPrice;
          } else {
            cart.products[index].totalPrice =
              cart.products[index].quantity * product.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            productsErrors.PRODUCT_NOT_FOUND.message,
            BAD_REQUEST,
            productsErrors.PRODUCT_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatePackageInCart(packageId, userId, newQuantity, newPrice) {
    try {
      const Package = await packageService.getPackage(packageId);
      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      let cart = await cartModel.findOne({ userId });

      if (cart) {
        const index = cart.packages.findIndex(p => p.packageId == packageId);
        if (index > -1) {
          if (newQuantity) {
            const canUpdateQuantity = await packageService.checkAvailableQuantity(
              newQuantity,
              packageId
            );
            if (!canUpdateQuantity) {
              throw new ErrorResponse(
                packageErrors.INSUFFICIENT_STOCK_WITH_ID.message(Package),
                BAD_REQUEST,
                packageErrors.INSUFFICIENT_STOCK_WITH_ID.code
              );
            }
            cart.packages[index].quantity = newQuantity;
          }

          if (newPrice) {
            cart.packages[index].totalPrice = cart.packages[index].quantity * newPrice;
          } else {
            cart.packages[index].totalPrice =
              cart.packages[index].quantity * Package.price.finalPrice;
          }

          cart.totalPrice = this.calculateTotalPrice(cart);
          await cartModel.update({ userId }, cart);
        } else {
          throw new ErrorResponse(
            packageErrors.PACKAGE_NOT_FOUND.message,
            BAD_REQUEST,
            packageErrors.PACKAGE_NOT_FOUND.code
          );
        }
      }

      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async decreasePackageQuantity(packageId, userId) {
    try {
      const cart = await cartModel.findOne({ userId });
      if (!cart) {
        throw new ErrorResponse(
          cartError.CART_NOT_FOUND.message,
          BAD_REQUEST,
          cartError.CART_NOT_FOUND.code
        );
      }
  
      const index = cart.packages.findIndex(p => p.packageId == packageId);
      if (index === -1 || cart.packages[index].quantity <= 1) {
        throw new ErrorResponse(
          packageErrors.INVALID_QUANTITY.message,
          BAD_REQUEST,
          packageErrors.INVALID_QUANTITY.code
        );
      }
  
      cart.packages[index].quantity -= 1;
      cart.packages[index].totalPrice =
        cart.packages[index].quantity *
        (await packageService.getPackage(packageId)).price.finalPrice;
      cart.totalPrice = this.calculateTotalPrice(cart); 
      await cartModel.update({ userId }, cart);
  
      return cart;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async increasePackageQuantity(packageId, userId) {
    return this.AddPackageToCart(packageId, userId, 1); 
  }
  

  calculateTotalPrice = cart => {
    let total = 0;
    cart.products.forEach(product => {
      total += product.totalPrice;
    });
    cart.packages.forEach(pkg => {
      total += pkg.totalPrice;
    });
    return total;
  };
}

export default new CartService();

