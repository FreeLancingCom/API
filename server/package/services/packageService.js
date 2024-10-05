import packagesModel from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { packageErrors } from '../helpers/constants.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

class PackageService {
  async listPackages(query) {
    try {
      const { limit, skip, sort } = getPaginationAndSortingOptions(query);
      const packages = await packagesModel.find();
      if (!packages) {
        throw new ErrorResponse(packageErrors.PACKAGE_NOT_LISTED.message, BAD_REQUEST);
      }
      return packages;
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async getPackage(packageId) {
    const packageData = await packagesModel.findById(packageId).exec();
    if (!packageData) {
      throw new ErrorResponse(packageErrors.PACKAGE_NOT_FOUND.message, BAD_REQUEST);
    }
    return packageData;
  }

  async createPackage(packageData) {
    const createdPackage = await packagesModel.create(packageData);
    if (!createdPackage) {
      throw new ErrorResponse(packageErrors.PACKAGE_NOT_CREATED.message, BAD_REQUEST);
    }
    return createdPackage;
  }

  async updatePackage(packageId, packageData) {
    const updatedPackage = await packagesModel
      .update(packageId, packageData)
      .exec();
    if (!updatedPackage) {
      throw new ErrorResponse(packageErrors.PACKAGE_NOT_UPDATED.message, BAD_REQUEST);
    }
    return updatedPackage;
  }

  async deletePackage(packageId) {
    const deletedPackage = await packagesModel.findByIdAndDelete(packageId).exec();
    if (!deletedPackage) {
      throw new ErrorResponse(packageErrors.PACKAGE_NOT_DELETED.message, BAD_REQUEST);
    }
    return deletedPackage;
  }
}

export default new PackageService();
