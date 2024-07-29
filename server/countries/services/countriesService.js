import Country from '../model/index.js';
import { countryError } from '../helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

class CountriesService {
  async listCountries(query) {
    const { limit, skip, sort, page, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    const data = await Country.find(_query, options);
    return { data, options };
  }

  async getCountry(id) {
    const data = await Country.findOne({ _id: id });
    return data;
  }

  async createCountry(body) {
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
  }

  async updateCountry(id, body) {
    const existingCountry = await Country.findOne({ _id: id });

    if (!existingCountry) {
      throw new ErrorResponse(
        countryError.COUNTRY_NOT_FOUND.message,
        BAD_REQUEST,
        countryError.COUNTRY_NOT_FOUND.code
      );
    }
    const data = await Country.update({ _id: id }, body);
    return data;
  }

  async deleteCountry(id) {
    const data = await Country.delete({ _id: id });
    return data;
  }
}

export default new CountriesService();
