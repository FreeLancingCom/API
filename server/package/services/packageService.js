import PackageModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { packageErrors } from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

class PackageService {
  async listPackages(query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const packages = await PackageModel.find(_query, options);

      return { packages, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getPackage(packageId) {
    try {
      
      const Package = await PackageModel.findOne({ _id: packageId });

      if (!Package) {
        throw new ErrorResponse(
          packageErrors.PACKAGE_NOT_FOUND.message,
          BAD_REQUEST,
          packageErrors.PACKAGE_NOT_FOUND.code
        );
      }

      return Package;
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
}

export default new PackageService();