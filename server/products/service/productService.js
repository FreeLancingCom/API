import ProductModel from '../model/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { productsErrors } from '../helper/constants.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

const { BAD_REQUEST } = StatusCodes;

class ProductService {
  async listProducts(query) {
    try {
      const { limit, sort, skip, page, ..._query } = query;
      const options = getPaginationAndSortingOptions(query);
      const products = await ProductModel.find(_query, options, null);
      return { products, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  //?mc here would be the req.params.mcId , because two roles can access this route  {provider, client}
  async listMaintenanceCenterProducts(mcId, query) {
    try {
      const { limit, sort, skip, page, ..._query } = query;
      const options = getPaginationAndSortingOptions(query);

      if (!mcId) {
        throw new ErrorResponse(
          productsErrors.MAINTENANCE_CENTER_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.MAINTENANCE_CENTER_NOT_FOUND.code
        );
      }

      const products = await ProductModel.find(
        { maintenanceCenterId: mcId, ..._query },
        options,
        null
      );
      if (!products || products.length === 0)
        throw new ErrorResponse(
          productsErrors.NO_PRODUCTS_FOUND_FOR_MAINTENANCE_CENTER.message,
          BAD_REQUEST,
          productsErrors.NO_PRODUCTS_FOUND_FOR_MAINTENANCE_CENTER.code
        );
      return { products, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getProduct(productId, options) {
    try {
      const product = await ProductModel.findOneAndIncludePopulate({ _id: productId }, options);
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

  //? mcId here from the token(req.user.maintenanceCenterId) as the product provider only can access it
  async createProduct(userId, mcId, productData) {
    productData['addedBy'] = userId;
    productData['maintenanceCenterId'] = mcId;
    try {
      if (!productData['nameAr']) productData['nameAr'] = productData['name'];
      // const subcategoryId = productData['subcategoryId'];

      // const subcategories = await SubcategoryModel.find({
      //   _id: { $in: subcategoryId }
      // });

      // if (subcategories.length !== subcategoryId.length) {
      //   throw new ErrorResponse(
      //     productsErrors.SUBCATEGORY_NOT_FOUND.message,
      //     BAD_REQUEST,
      //     productsErrors.SUBCATEGORY_NOT_FOUND.code
      //   );
      // }

      // const firstCategoryId = subcategories[0].categoryId.toString();
      // const isMatchingCategoryId = subcategories.every(subcategory => subcategory.categoryId.toString() === firstCategoryId);

      // if (!isMatchingCategoryId) {
      //   throw new ErrorResponse(
      //     productsErrors.SUBCATEGORIES_MISMATCH.message,
      //     BAD_REQUEST,
      //     productsErrors.SUBCATEGORIES_MISMATCH.code
      //   );
      // }

      // productData['categoryId'] = firstCategoryId

      // if (productData['brandId']){
      //   const brand = await BrandModel.findOne({ _id: productData['brandId'] });
      //   if (!brand) {
      //     throw new ErrorResponse(
      //       productsErrors.BRAND_NOT_FOUND.message,
      //       BAD_REQUEST,
      //       productsErrors.BRAND_NOT_FOUND.code
      //     );
      //   }
      // }

      // const unitsSold = count(prodId in carts)

      const product = await ProductModel.create(productData);
      return product;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProduct(productId, mcId, productData) {
    try {
      const product = await ProductModel.findOne({ _id: productId, maintenanceCenterId: mcId });
      if (!product)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      // productData['categoryId'] = product.categoryId

      // if (productData['subcategoryId']) {
      //   const subcategoryId = productData['subcategoryId'];

      //   const subcategories = await SubcategoryModel.find({
      //     _id: { $in: subcategoryId }
      //   });

      //   if (subcategories.length !== subcategoryId.length) {
      //     throw new ErrorResponse(
      //       productsErrors.SUBCATEGORY_NOT_FOUND.message,
      //       BAD_REQUEST,
      //       productsErrors.SUBCATEGORY_NOT_FOUND.code
      //     );
      //   }

      //   const firstCategoryId = subcategories[0].categoryId.toString();
      //   const isMatchingCategoryId = subcategories.every(subcategory => subcategory.categoryId.toString() === firstCategoryId);

      //   if (!isMatchingCategoryId) {
      //     throw new ErrorResponse(
      //       productsErrors.SUBCATEGORIES_MISMATCH.message,
      //       BAD_REQUEST,
      //       productsErrors.SUBCATEGORIES_MISMATCH.code
      //     );
      //   }
      //   productData['categoryId'] = firstCategoryId

      // }

      // if (productData['brandId']) {
      //   const brand = await BrandModel.findOne({ _id: productData['brandId'] });
      //   if (!brand)
      //     throw new ErrorResponse(
      //       productsErrors.BRAND_NOT_FOUND.message,
      //       BAD_REQUEST,
      //       productsErrors.BRAND_NOT_FOUND.code
      //     );
      // }
      const updatedProduct = await ProductModel.update(
        { _id: productId, maintenanceCenterId: mcId },
        productData
      );
      return updatedProduct;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteProduct(productId, mcId) {
    try {
      const product = await ProductModel.findOne({ _id: productId, maintenanceCenterId: mcId });
      if (!product)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );

      const deletedProduct = await ProductModel.delete({
        _id: productId,
        maintenanceCenterId: mcId
      });

      // await usersService.updateUserWishlist([productId]);

      return deletedProduct;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  //{productId, quantity}
  async SubtractAvailableQuantity(purchasedProducts) {
    try {
      const errors = [];

      for (const { productId, quantity } of purchasedProducts) {
        try {
          if (await this.isQuantityAvailable(productId, quantity)) {
            await this.subtractQuantity(productId, quantity);
          }
        } catch (error) {
          errors.push({ productId, message: error.message });
        }
      }

      if (errors.length > 0) {
        throw new ErrorResponse(
          productsErrors.INSUFFICIENT_STOCK.message,
          BAD_REQUEST,
          productsErrors.INSUFFICIENT_STOCK.code,
          errors
        );
      }

      return { success: true, message: 'All products were updated successfully.' };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async isQuantityAvailable(productId, quantity) {
    try {
      const product = await ProductModel.findOne({ _id: productId });
      if (!product) {
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );
      }
      if (product.availableQuantity < quantity) {
        throw new ErrorResponse(
          productsErrors.INSUFFICIENT_STOCK_WITH_ID.message(productId),
          BAD_REQUEST,
          productsErrors.INSUFFICIENT_STOCK_WITH_ID.code
        );
      }
      return true;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async subtractQuantity(productId, quantity) {
    try {
      await ProductModel.update({ _id: productId }, { $inc: { availableQuantity: -quantity } });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getProductByTypeId(typeId, options) {
    try {
      const product = await ProductModel.findOne({ typeId }, options);
      if (product)
        return true

      return false;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  // async verifyProductsExistence(productIds = []) {
  //   try {
  //     const products = await ProductModel.find({ _id: { $in: productIds } });
  //     if (!products || products.length != productIds.length)
  //       throw new ErrorResponse(
  //         productsErrors.PRODUCT_NOT_FOUND.message,
  //         BAD_REQUEST,
  //         productsErrors.PRODUCT_NOT_FOUND.code
  //       );

  //     return products;
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }

  // async verifyInputProductsQuantity(productsToBeVerified = []) {
  //   try {
  //     if (!productsToBeVerified.length) return;

  //     const productIdQuantityMap = new Map(
  //       productsToBeVerified.map(product => [product._id, product.quantity])
  //     );
  //     const productsIds = Array.from(productIdQuantityMap.keys());
  //     const products = await this.verifyProductsExistence(productsIds);

  //     for (const product of products) {
  //       if(product.offer){
  //         continue;
  //       }
  //       const requestedQuantity = productIdQuantityMap.get(product._id);
  //       if (requestedQuantity > product.quantity) {
  //         throw new ErrorResponse(
  //           productsErrors.INSUFFICIENT_STOCK.message(product._id),
  //           BAD_REQUEST,
  //           productsErrors.INSUFFICIENT_STOCK.code
  //         );
  //       }
  //     }
  //     return { products, verifiedProducts: productsToBeVerified };
  //   } catch (error) {
  //     logger.error(error);
  //     throw error;
  //   }
  // }

  // async deleteCategoryProducts(selector) {
  //   try {
  //     const products = await ProductModel.find(selector);
  //     if (!products)
  //       throw new ErrorResponse(
  //         productsErrors.PRODUCT_NOT_FOUND.message,
  //         BAD_REQUEST,
  //         productsErrors.PRODUCT_NOT_FOUND.code
  //       );

  //     const deletedProducts = await ProductModel.deleteMany(selector);

  //     const productIds = products.map(product => product._id);

  //     await usersService.updateUserWishlist(productIds);

  //     return deletedProducts;
  //   } catch (e) {
  //     logger.error(e.message);
  //     throw e;
  //   }
  // }

  // async deleteSubcategoryProducts(selector) {
  //   try {
  //     const products = await ProductModel.find(
  //       selector
  //     );

  //       if (!products)
  //       throw new ErrorResponse(
  //         productsErrors.PRODUCT_NOT_FOUND.message,
  //         BAD_REQUEST,
  //         productsErrors.PRODUCT_NOT_FOUND.code
  //       );

  //     await ProductModel.updateMany(
  //       selector,
  //       { $pull: { subcategoryId: selector.subcategoryId } }
  //     );

  //     const productsIds = products.map(product => product._id)

  //     const updatedProducts = await ProductModel.find({
  //       _id: { $in: productsIds }
  //     });

  //     const productsToDelete = updatedProducts.filter(product => product.subcategoryId.length === 0);

  //     const productIdsToDelete = productsToDelete.map(product => product._id);

  //     let deletedProducts = [];
  //     if (productIdsToDelete.length > 0) {
  //       deletedProducts = await ProductModel.deleteMany({ _id: { $in: productIdsToDelete } });
  //       await usersService.updateUserWishlist(productIdsToDelete);
  //     }

  //     return deletedProducts;
  //   } catch (e) {
  //     logger.error(e.message);
  //     throw e;
  //   }
  // }
}

export default new ProductService();
