import CityModel from '../model/index.js';
import Country from '../../countries/model/index.js';
import { cityErrors } from '../helpers/constant.js';
import { countryError } from '../../countries/helpers/constant.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST } = StatusCodes;

import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

import logger from '../../../common/utils/logger/index.js';
class CitiesService {
  async listCountries(query) {
    const { limit, skip, sort, page, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);

    try {
      const cities = await CityModel.find(_query, options);

      return { cities, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCity(cityId) {
    try {
      const city = await CityModel.findOne({ _id: cityId });
      if (!city) {
        throw new ErrorResponse(
          cityErrors.CITY_NOT_FOUND.message,
          BAD_REQUEST,
          cityErrors.CITY_NOT_FOUND.code
        );
      }
      return city;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createCity(body) {
    try {
      const existingCity = await CityModel.findOne({ name: body.name });

      if (existingCity) {
        throw new ErrorResponse(
          cityErrors.CITY_ALREADY_EXISTS.message,
          BAD_REQUEST,
          cityErrors.CITY_ALREADY_EXISTS.code
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

      const createdCity = await CityModel.create(body);
      return createdCity;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateCity(cityId, body) {
    try {
      if (body['countryId']) {
        const isExistCountry = await Country.findOne({ _id: body.countryId });

        if (!isExistCountry) {
          throw new ErrorResponse(
            countryError.COUNTRY_NOT_FOUND.message,
            BAD_REQUEST,
            countryError.COUNTRY_NOT_FOUND.code
          );
        }
      }

      const updatedCity = await CityModel.update({ _id: cityId }, body);
      return updatedCity;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteCity(cityId) {
    try {
      const existingCity = await CityModel.findOne({ _id: cityId });
      if (!existingCity) {
        throw new ErrorResponse(
          cityErrors.CITY_NOT_FOUND.message,
          BAD_REQUEST,
          cityErrors.CITY_NOT_FOUND.code
        );
      }
      const deletedCity = await CityModel.delete({ _id: cityId });
      return deletedCity;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new CitiesService();
