import addressesModel from '../model/index.js';
import City from '../../cities/model/index.js';
import Country from '../../countries/model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { addressError } from '../helper/constant.js';
import { cityErrors } from '../../cities/helpers/constant.js';
import { countryError } from '../../countries/helpers/constant.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';

class AddressesService {
  async listAddresses(query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const addresses = await addressesModel.find(_query, options);

      return { addresses, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAddress(addressId) {
    try {
      const address = await addressesModel.findOne({ _id: addressId });
      if (!address) {
        throw new ErrorResponse(
          addressError.ADDRESS_NOT_FOUND.message,
          BAD_REQUEST,
          addressError.ADDRESS_NOT_FOUND.code
        );
      }
      return address;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createAddress(body) {
    try {
      const isExistAddress = await addressesModel.findOne({ name: body.name });

      if (isExistAddress) {
        throw new ErrorResponse(
          addressError.ADDRESS_ALREADY_EXISTS.message,
          BAD_REQUEST,
          addressError.ADDRESS_ALREADY_EXISTS.code
        );
      }

      const isExistCity = await City.findOne({ _id: body.cityId });

      if (isExistCity) {
        body.countryId = isExistCity.countryId;
      }

      if (!isExistCity) {
        throw new ErrorResponse(
          cityErrors.CITY_NOT_FOUND.message,
          BAD_REQUEST,
          cityErrors.CITY_NOT_FOUND.code
        );
      }

      const createdAddress = await addressesModel.create(body);
      return createdAddress;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateAddress(addressId, body) {
    try {
      const isExistAddress = await addressesModel.findOne({ _id: addressId });

      if (!isExistAddress) {
        throw new ErrorResponse(
          addressError.ADDRESS_NOT_FOUND.message,
          BAD_REQUEST,
          addressError.ADDRESS_NOT_FOUND.code
        );
      }

      if (body['cityId']) {
        const isExistCity = await City.findOne({ _id: body.cityId });
        if (!isExistCity) {
          throw new ErrorResponse(
            cityErrors.CITY_NOT_FOUND.message,
            BAD_REQUEST,
            cityErrors.CITY_NOT_FOUND.code
          );
        }
      }

      body.countryId = isExistCity.countryId;

      const updatedAddress = await addressesModel.update({ _id: addressId }, body);
      return updatedAddress;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteAddress(addressId) {
    try {
      const isExistAddress = await addressesModel.findOne({ _id: addressId });

      if (!isExistAddress) {
        throw new ErrorResponse(
          addressError.ADDRESS_NOT_FOUND.message,
          BAD_REQUEST,
          addressError.ADDRESS_NOT_FOUND.code
        );
      }
      const deletedAddress = await addressesModel.delete({ _id: addressId });
      return deletedAddress;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countAddresses(query) {
    try {
      const { limit, skip, sort, ..._query } = query;
      const count = await addressesModel.count(_query);
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new AddressesService();
