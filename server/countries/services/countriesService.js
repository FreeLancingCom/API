import Country from '../model/index.js';
import { countryError } from '../helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

import logger from '../../../common/utils/logger/index.js';
class CountriesService {
  async listCountries(query) {
    const { limit, skip, sort, page, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);

    try {
      const data = await Country.find(_query, options);
      data.options = options;
      return data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCountry(countryId) {
    try {
      const data = await Country.findOne({ _id: countryId });
      if (!data) {
        throw new ErrorResponse(
          countryError.COUNTRY_NOT_FOUND.message,
          BAD_REQUEST,
          countryError.COUNTRY_NOT_FOUND.code
        );
      }
      return data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createCountry(body) {
    try {
      const existingCountry = await Country.findOne({ name: body.name });
      if (existingCountry) {
        throw new ErrorResponse(
          countryError.COUNTRY_ALREADY_EXISTS.message,
          BAD_REQUEST,
          countryError.COUNTRY_ALREADY_EXISTS.code
        );
      }

      const data = await Country.create(body);
      return data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateCountry(countryId, body) {
    try {
      const existingCountry = await Country.findOne({ _id: countryId });

      if (!existingCountry) {
        throw new ErrorResponse(
          countryError.COUNTRY_NOT_FOUND.message,
          BAD_REQUEST,
          countryError.COUNTRY_NOT_FOUND.code
        );
      }
      await Country.update({ _id: countryId }, body);
      const data = await Country.findOne({ _id: countryId });

      return data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteCountry(id) {
    try {
      const data = await Country.delete({ _id: id });
      return data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new CountriesService();
