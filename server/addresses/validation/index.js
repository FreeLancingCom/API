import Joi from 'joi';
import { CONTROLLERS } from '../helper/constant.js';

// import CountryModel from '../../../countries/models/countryModel.js';
// import CityModel from '../../../cities/models/cityModel.js';

// const validateCountryId = async (value, helpers) => {
//   const country = await CountryModel.findOne(value);
//   if (!country) {
//     return helpers.error('any.invalid', { message: 'Country not found' });
//   }
//   return value;
// };

// const validateCityId = async (value, helpers) => {
//   const city = await CityModel.findById(value);
//   if (!city) {
//     return helpers.error('any.invalid', { message: 'City not found' });
//   }
//   return value;
// }

export default {
  [CONTROLLERS.LIST_ADDRESSES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().max(10).optional()
      })
      .optional()
  },
  [CONTROLLERS.GET_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.CREATE_ADDRESS]: {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        countryId: Joi.string().required() /*.custom(validateCountryId),*/,
        cityId: Joi.string().required() /*custom(validateCityId)*/,
        firstLine: Joi.string().required(),
        secondLine: Joi.string().optional(),
        googleMapsLink: Joi.string().optional()
      })
      .required()
  },
  [CONTROLLERS.UPDATE_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        name: Joi.string().optional(),
        countryId: Joi.string().optional(),
        cityId: Joi.string().optional(),
        firstLine: Joi.string().optional(),
        secondLine: Joi.string().optional(),
        googleMapsLink: Joi.string().optional()
      })
      .optional()
  },
  [CONTROLLERS.DELETE_ADDRESS]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  }
};
