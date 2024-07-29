import addressesModel from '../model/index.js';
import City from '../../cities/model/index.js';
import Country from '../../countries/model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { addressError } from '../helper/constant.js';
import {cityErrors} from '../../cities/helpers/constant.js';
import {countryError} from '../../countries/helpers/constant.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;
class AddressesService {
  async listAddresses(query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    const data = await addressesModel.find(_query, options);
    return { data, options };
  }
  async getAddress(addressId) {
    const data = await addressesModel.findOne({ _id: addressId });
    if (!data) {
      throw new ErrorResponse(
        addressError.ADDRESS_NOT_FOUND.message,
        BAD_REQUEST,
        addressError.ADDRESS_NOT_FOUND.code
      );
    }
    return data;
  }

  async createAddress(body) {
    const isExistAddress = await addressesModel.findOne({ name: body.name });

    if (isExistAddress) {
      throw new ErrorResponse(
        addressError.ADDRESS_ALREADY_EXISTS.message,
        BAD_REQUEST,
        addressError.ADDRESS_ALREADY_EXISTS.code
      );
    }

    const isExistCountry = await Country.findOne({ _id: body.countryId });

    if (!isExistCountry) {
      throw new ErrorResponse(
        countryError.COUNTRY_NOT_FOUND.message,
        BAD_REQUEST,
        countryError.COUNTRY_NOT_FOUND.code
      );
    }

    const isExistCity = await City.findOne({ _id: body.cityId });
    
    if (!isExistCity) {
      throw new ErrorResponse(
        cityErrors.CITY_NOT_FOUND.message,
        BAD_REQUEST,
        cityErrors.CITY_NOT_FOUND.code
      );
    }


    const data = await addressesModel.create(body);
    return data;
  }
  async updateAddress(addressId, body) {
    const isExistAddress = await addressesModel.findOne({ _id: addressId });

    if (!isExistAddress) {
      throw new ErrorResponse(
        addressError.ADDRESS_NOT_FOUND.message,
        BAD_REQUEST,
        addressError.ADDRESS_NOT_FOUND.code
      );
    }

    const isExistCountry = await Country.findOne({ _id: body.countryId });

    if (!isExistCountry) {
      throw new ErrorResponse(
        countryError.COUNTRY_NOT_FOUND.message,
        BAD_REQUEST,
        countryError.COUNTRY_NOT_FOUND.code
      );
    }

    const isExistCity = await City.findOne({ _id: body.cityId });
    
    if (!isExistCity) {
      throw new ErrorResponse(
        cityErrors.CITY_NOT_FOUND.message,
        BAD_REQUEST,
        cityErrors.CITY_NOT_FOUND.code
      );
    }




    const data = await addressesModel.update({ _id: addressId }, body);
    return data;
  }

  async deleteAddress(addressId) {

    const isExistAddress = await addressesModel.findOne({ _id: addressId });

    if (!isExistAddress) {
      throw new ErrorResponse(
        addressError.ADDRESS_NOT_FOUND.message,
        BAD_REQUEST,
        addressError.ADDRESS_NOT_FOUND.code
      );
    }
    const data = await addressesModel.delete({ _id: addressId });
    return data;
  }
}

export default new AddressesService();
