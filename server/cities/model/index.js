import CitySchema from '../schema/index.js';

class City {
  async find(selectors = {}, options = {}) {
    let { limit, skip, sort } = options;

    const result = await CitySchema.find(selectors)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, populationList = []) {
    const result = await CitySchema.findOne(selector).lean().populate(populationList);
    return result;
  }

  async create(payload) {
    const result = await CitySchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await AddressSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async delete(selector, options = {}) {
    const result = await CitySchema.deleteOne(selector, options);
    return result;
  }
}

export default new City();
