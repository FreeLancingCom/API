export const CONTROLLER = {
  CREATE_COUNTRY: 'CREATE_COUNTRY',
  LIST_COUNTRIES: 'GET_COUNTRIES',
  GET_COUNTRY: 'GET_COUNTRY',
  UPDATE_COUNTRY: 'UPDATE_COUNTRY',
  DELETE_COUNTRY: 'DELETE_COUNTRY',
  COUNT_COUNTRIES: 'COUNT_COUNTRIES'
};

export const countryError = Object.freeze({
  COUNTRY_NOT_FOUND: {
    code: 100,
    message: 'Country not found'
  },
  COUNTRY_ALREADY_EXISTS: {
    code: 101,
    message: 'Country already exists'
  },
  COUNTRY_NOT_CREATED: {
    code: 102,
    message: 'Country not created'
  },
  COUNTRY_NOT_UPDATED: {
    code: 103,
    message: 'Country not updated'
  },
  COUNTRY_NOT_DELETED: {
    code: 104,
    message: 'Country not deleted'
  }
});
