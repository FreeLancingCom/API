import CityModel from '../model/index.js';
import Country from '../../countries/model/index.js';
import { cityErrors } from '../helpers/constant.js';
import  {countryError} from '../../countries/helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

class CitiesService {
  async listCountries(query) {
    const { limit, skip, sort, page, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    const data = await CityModel.find(_query, options);
    return { data, options };
  }

  async getCity(cityId) {
    const data = await CityModel.findOne({ _id: cityId });
    if (!data) {
      throw new ErrorResponse(
        cityErrors.CITY_NOT_FOUND.message,
        BAD_REQUEST,
        cityErrors.CITY_NOT_FOUND.code
      );
    }
    return data;
  }

  async createCity(body) {
    const existingCity = await CityModel.findOne({ name: body.name });

    if (existingCity) {
      throw new ErrorResponse(
        cityErrors.City_ALREADY_EXISTS.message,
        BAD_REQUEST,
        cityErrors.City_ALREADY_EXISTS.code
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

    const data = await CityModel.create(body);
    return data;
  }

  async updateCity(cityId, body) {
    const existingCity = await CityModel.findOne({ _id: cityId });

    if (!existingCity) {
      throw new ErrorResponse(
        cityErrors.City_NOT_FOUND.message,
        BAD_REQUEST,
        cityErrors.City_NOT_FOUND.code
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



    const data = await CityModel.update({ _id: cityId }, body);
    return data;
  }

  async deleteCity(cityId) {
    const existingCity = await CityModel.findOne({ _id: cityId });
    if (!existingCity) {
      throw new ErrorResponse(
        cityErrors.City_NOT_FOUND.message,
        BAD_REQUEST,
        cityErrors.City_NOT_FOUND.code
      );
    }
    const data = await CityModel.delete({ _id: cityId });
    return data;
  }
}

export default new CitiesService();
