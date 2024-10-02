import _ from 'lodash';
import { CONTROLLERS } from '../helpers/constants.js';
import packageService from '../services/packageService.js';
import logger from '../../../common/utils/logger/index.js';
import { StatusCodes } from 'http-status-codes';

export default {
  [CONTROLLERS.LIST_PACKAGES]: async (req, res) => {
    try {
      const packages = await packageService.listPackages();
      return res.status(StatusCodes.OK).json(packages);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_PACKAGE]: async (req, res) => {
    try {
      const packageId = _.get(req, 'params.packageId');
      const packageData = await packageService.getPackage(packageId);
      if (!packageData) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Package not found' });
      }
      return res.status(StatusCodes.OK).json(packageData);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_PACKAGE]: async (req, res) => {
    try {
      const packageData = _.get(req, 'body');
      const createdPackage = await packageService.createPackage(packageData);
      if (!createdPackage) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Package not created' });
      }
      return res.status(StatusCodes.OK).json(createdPackage);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_PACKAGE]: async (req, res) => {
    try {
      const packageId = _.get(req, 'params.packageId');
      const packageData = _.get(req, 'body');
      const updatedPackage = await packageService.updatePackage(packageId, packageData);
      if (!updatedPackage) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Package not updated' });
      }
      return res.status(StatusCodes.OK).json(updatedPackage);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_PACKAGE]: async (req, res) => {
    try {
      const packageId = _.get(req, 'params.packageId');
      const deletedPackage = await packageService.deletePackage(packageId);
      if (!deletedPackage) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Package not deleted' });
      }
      return res.status(StatusCodes.OK).json(deletedPackage);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
