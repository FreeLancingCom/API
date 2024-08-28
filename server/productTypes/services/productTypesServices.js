import ProductTypeModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import notificationsService from '../../notifications/services/notificationsService.js';
import {
  productTypesErrors,
  PRODUCT_STATUS,
  PRODUCT_APPROVED,
  PRODUCT_DECLINED
} from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import productService from '../../products/service/productService.js';
import { searchSelectorsFun } from '../helpers/searchSelectors.js';

class ProductTypeService {

  async listProductsTypes(userRole, query) {
    try {
      const { limit, skip, sort, ..._query } = query;
      const options = getPaginationAndSortingOptions(query);
      const selectors = searchSelectorsFun(query);

      if (userRole === USER_ROLES.CLIENT || userRole === USER_ROLES.PROVIDER) {
        selectors.status = PRODUCT_STATUS.APPROVED
      }

      const productTypes = await ProductTypeModel.find(selectors, options);

      return { productTypes, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getProductType(productTypeId) {
    try {
      const productType = await ProductTypeModel.findOne({ _id: productTypeId });
      if (!productType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.code
        );
      }
      return productType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createProductType(userId, body) {
    try {

      body['creatorId'] = userId;
      const isExistProductType = await ProductTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isExistProductType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.code
        );
      }

      const createdProductType = await ProductTypeModel.create(body);
      return createdProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateProductType(productTypeId, body) {
    try {
      const isExistProductType = await ProductTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      const isRepeatedNameOrNameAr = await ProductTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isRepeatedNameOrNameAr)
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.code
        );

      const isExistsProduct = await productService.getProductByTypeId(productTypeId)
      if (isExistsProduct)
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_IS_ALREADY_USED.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_IS_ALREADY_USED.code
        );

      const updatedProductType = await ProductTypeModel.update({ _id: productTypeId }, body);
      return updatedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteProductType(productTypeId) {
    try {
      const isExistProductType = await ProductTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      const isExistsProduct = await productService.getProductByTypeId(productTypeId)
      if (isExistsProduct)
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_IS_ALREADY_USED.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_IS_ALREADY_USED.code
        );

      const deletedProductType = await ProductTypeModel.delete({ _id: productTypeId });
      return deletedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async approveProductType(userId, productTypeId) {
    try {
      const isExistProductType = await ProductTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      if (isExistProductType.status != PRODUCT_STATUS.PENDING) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_PENDING.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_PENDING.code
        );
      }

      const approvedProductType = await ProductTypeModel.update(
        { _id: productTypeId },
        { status: PRODUCT_STATUS.APPROVED }
      );
      const notificationData = {
        contentType: 'message',
        targets: [isExistProductType.creatorId],
        message: PRODUCT_APPROVED(isExistProductType.name)
      };
      notificationsService.createNotification(userId, notificationData);
      return approvedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async declineProductType(userId, productTypeId) {
    try {
      const isExistProductType = await ProductTypeModel.findOne({ _id: productTypeId });

      if (!isExistProductType) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_FOUND.code
        );
      }

      if (isExistProductType.status != PRODUCT_STATUS.PENDING) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_NOT_PENDING.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_NOT_PENDING.code
        );
      }

      const declinedProductType = await ProductTypeModel.update(
        { _id: productTypeId },
        { status: PRODUCT_STATUS.DECLINED }
      );

      const notificationData = {
        contentType: 'message',
        targets: [isExistProductType.creatorId],
        message: PRODUCT_DECLINED(isExistProductType.name)
      };
      notificationsService.createNotification(userId, notificationData);

      return declinedProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async requestProductType(userId, body) {
    body['creatorId'] = userId;
    try {
      const isExistProduct = await ProductTypeModel.findOne({
        $or: [{ name: body.name }, { nameAr: body.nameAr }]
      });

      if (isExistProduct) {
        throw new ErrorResponse(
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          productTypesErrors.PRODUCT_TYPE_ALREADY_EXISTS.code
        );
      }
      body['status'] = PRODUCT_STATUS.PENDING;
      const createdProductType = await ProductTypeModel.create(body);
      return createdProductType;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async countProductTypes(userRole, query) {
    try {
      const selectors = searchSelectorsFun(query);
      if (userRole === USER_ROLES.CLIENT || userRole === USER_ROLES.PROVIDER) {
        selectors.status = PRODUCT_STATUS.APPROVED
      }
      const count = await ProductTypeModel.count(selectors);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new ProductTypeService();
