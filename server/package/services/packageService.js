import PackageModel from '../model/index.js';
import Product from '../../products/schema/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import commentsService from '../../comments/service/commentsService.js';

import { packageErrors } from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

import Fuse from 'fuse.js';

class PackageService {
  async listPackages(query) {
    try{
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
    let packages = await PackageModel.find(_query, options , {}); 
    const count = await PackageModel.countDocuments(_query); 

    if (search) {
      const fuse = new Fuse(packages, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.3,
      });
      packages = fuse.search(search).map(result => result.item);
    }

    return {
      packages,
      options: {
        ...options,
        count
      }
    };

    }

    catch (e) {
      logger.error(e);
      throw e;
    }

   
  }

  async getPackage(packageId , query={}) {
    try {
      
      const Package = await PackageModel.findOne({ _id: packageId });
      const productsForThatPackage =  await Product.find({packageId : packageId})
      const packageComments  = await commentsService.listComments(packageId, query);


      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }
      
      return {Package , productsForThatPackage , packageComments };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createPackage(packageData) {
    try {
      const isPackageExist = await PackageModel.findOne({ name: packageData.name });

      if (isPackageExist) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_ALREADY_EXISTS.code
        );
      }

      packageData['totalPrice'] = packageData.price.finalPrice * packageData.quantity;
      

      const Package = await PackageModel.create(packageData);

      return Package;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updatePackage(packageId, packageData) {
    try {
      const isExistPackage = await PackageModel.findOne({ _id: packageId });
      if (!isExistPackage) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

     const isTherePackageWithSameName = await PackageModel.findOne({ name: packageData.name });

     if(isTherePackageWithSameName){
        throw new ErrorResponse(
          packageErrors.PACKAGE_ALREADY_EXISTS.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_ALREADY_EXISTS.code
        );
     }

      const Package = await PackageModel.update({ _id: packageId }, packageData);
      return Package;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deletePackage(packageId) {
    try {
      const isExistPackage = await PackageModel.findOne({ _id: packageId });
      if (!isExistPackage) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      return await PackageModel.delete({ _id: packageId });
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async checkAvailableQuantity(quantity, packageId) {
    try {
      const Package = await PackageModel.findOne({ _id: packageId });
      if (Package.availableQuantity < quantity) {
        return false;
      }

      return true;
    }
    catch (e) {
      logger.error(e);
      throw e;
    } 

  }

}

export default new PackageService();