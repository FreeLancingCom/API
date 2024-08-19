import ProdTypeModel from '../../productsTypes/model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { productsTypesError } from '../helper/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

class ProductsTypeService {
  async listProductsTypes(query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const ProdTemplate = await ProdTypeModel.find(_query, options);

      return { ProdTemplate, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getProductType(productTypeId) {
    try {
      const productType = await ProdTypeModel.findOne({ _id: productTypeId });
      if (!productType) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.code
        );
      }
      return productType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createProductType(body, userId) {
    body['creatorId'] = userId;
    try {
      const isExistProduct = await ProdTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isExistProduct) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_ALREADY_EXISTS.code
        );
      }

      const createdProductType = await ProdTypeModel.create(body);
      return createdProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProductType(productTypeId, body) {
    try {
      const isExistProductType = await ProdTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      const isRepeatedNameOrNameAr = await ProdTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isRepeatedNameOrNameAr) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_ALREADY_EXISTS.code
        );
      }

      const updatedProductType = await ProdTypeModel.update({ _id: productTypeId }, body);
      return updatedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  } // !!TODO : CHANGE NAME , if the products  have been added to products model same with deleteProductType

  async deleteProductType(productTypeId) {
    try {
      const isExistProductType = await ProdTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      const deletedProductType = await ProdTypeModel.delete({ _id: productTypeId });
      return deletedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async approveProductType(productTypeId) {
    try {
      const isExistProductType = await ProdTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      if (isExistProductType.status === 'APPROVED') {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_ALREADY_APPROVED.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_ALREADY_APPROVED.code
        );
      }

      const approvedProductType = await ProdTypeModel.update(
        { _id: productTypeId },
        { status: 'APPROVED' }
      );
      return approvedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async declineProductType(productTypeId) {
    try {
      const isExistProductType = await ProdTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      if (isExistProductType.status === 'DECLINE') {
        throw new ErrorResponse(
          productsTypesError.PRODUCT_TYPE_ALREADY_APPROVED.message,
          BAD_REQUEST,
          productsTypesError.PRODUCT_TYPE_ALREADY_APPROVED.code
        );
      }

      const declinedProductType = await ProdTypeModel.update(
        { _id: productTypeId },
        { status: 'DECLINE' }
      );
      return declinedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new ProductsTypeService();
