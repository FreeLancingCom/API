import ProductModel from '../model/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { productsErrors } from '../helper/constants.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import { searchSelectorsFun } from '../helper/searchSelectors.js';
import productTypesServices from '../../productTypes/services/productTypesServices.js';

const { BAD_REQUEST } = StatusCodes;

class ProductService {
  async listProducts(query) {
    try {
      const selectors = searchSelectorsFun(query);
      const options = getPaginationAndSortingOptions(query);
      const products = await ProductModel.find(selectors, options, null);
      const count = await ProductModel.count(selectors);

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

  //?mc here would be the req.params.mcId , because two roles can access this route  {provider, client}
  async getProduct(productId, options) {
    try {
      const product = await ProductModel.findOne({ _id: productId }, options);
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

  //? mcId here from the token(req.user.maintenanceCenter) as the product provider only can access it
  async createProduct(mcId, productData) {
    try {
      productData['maintenanceCenterId'] = mcId;
      const productType = await productTypesServices.getProductType(productData.typeId)
      if (!productType)
        throw new ErrorResponse(
          productsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_NOT_FOUND.code
        );

      const productExists = await ProductModel.findOne({ typeId: productType._id, maintenanceCenterId: mcId })
      if (productExists)
        throw new ErrorResponse(
          productsErrors.PRODUCT_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productsErrors.PRODUCT_ALREADY_EXISTS.code
        );

      productData['name'] = productType.name
      productData['nameAr'] = productType.nameAr

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

      return deletedProduct;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countProducts(query) {
    try {
      const selectors = searchSelectorsFun(query);
      const count = await ProductModel.count(selectors);
      return count;
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

}

export default new ProductService();