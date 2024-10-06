import ProductModel from '../models/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { productsErrors } from '../helpers/constants.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import Fuse from 'fuse.js';


const { BAD_REQUEST } = StatusCodes;

class ProductService {

  async listProducts(query) {
    try {
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
      let products = await ProductModel.find(_query, options , {}); 
      const count = await ProductModel.countDocuments(_query); 
  
      if (search) {
        const fuse = new Fuse(products, {
          keys: ['name', 'description', 'tags'],
          threshold: 0.3,
        });
          products = fuse.search(search).map(result => result.item);
      }
  
      return {
        products,
        options: {
          ...options,
          count
        }
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  
  
      

  async getProduct(productId) {
    try {
      const product = await ProductModel.findOne({ _id: productId });
      if (!product)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      return product;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createProduct(addedBy,productData) {
    productData['addedBy']=addedBy;
    productData['totalPrice'] = productData.price.finalPrice * productData.quantity;
    try {
       const isProductExist = await ProductModel.findOne({ name: productData.name });
        if (isProductExist)
            throw new ErrorResponse(
                productsErrors.PRODUCT_ALREADY_EXISTS.message,
                BAD_REQUEST,
                productsErrors.PRODUCT_ALREADY_EXISTS.code
            );  

     

      const product = await ProductModel.create(productData);
      return product;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProduct(productId ,  addedBy ,  productData) {
    try {
      const product = await ProductModel.findOne({ _id: productId});
      if (!product)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
       
        // make sure addedBy is added 
        productData['addedBy'] = addedBy
        // 
      const updatedProduct = await ProductModel.update(
        { _id: productId},
        productData
      );
      return updatedProduct;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await ProductModel.findOne({ _id: productId });
      if (!product)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );

      return await ProductModel.delete({
        _id: productId,
      });

    } catch (e) {
      logger.error(e);
      throw e;
    }
  }




  async checkAvailableQuantity(quantity, productId) {
    try {
      const product = await ProductModel.findOne({ _id: productId });
      
      if (product.availableQuantity < quantity) {
        return false;
      }
      return true;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  // //{productId, quantity}
  // async SubtractAvailableQuantity(purchasedProducts) {
  //   try {
  //     const errors = [];

  //     for (const { productId, quantity } of purchasedProducts) {
  //       try {
  //         if (await this.isQuantityAvailable(productId, quantity)) {
  //           await this.subtractQuantity(productId, quantity);
  //         }
  //       } catch (error) {
  //         errors.push({ productId, message: error.message });
  //       }
  //     }

  //     if (errors.length > 0) {
  //       throw new ErrorResponse(
  //         productsErrors.INSUFFICIENT_STOCK.message,
  //         BAD_REQUEST,
  //         productsErrors.INSUFFICIENT_STOCK.code,
  //         errors
  //       );
  //     }

  //     return { success: true, message: 'All products were updated successfully.' };
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }

  // async isQuantityAvailable(productId, quantity) {
  //   try {
  //     const product = await ProductModel.findOne({ _id: productId });
  //     if (!product) {
  //       throw new ErrorResponse(
  //         productsErrors.PRODUCT_NOT_FOUND.message,
  //         BAD_REQUEST,
  //         productsErrors.PRODUCT_NOT_FOUND.code
  //       );
  //     }
  //     if (product.availableQuantity < quantity) {
  //       throw new ErrorResponse(
  //         productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(productId),
  //         BAD_REQUEST,
  //         productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
  //       );
  //     }
  //     return true;
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }

  // async subtractQuantity(productId, quantity) {
  //   try {
  //     await ProductModel.update({ _id: productId }, { $inc: { availableQuantity: -quantity } });
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }



}

export default new ProductService();