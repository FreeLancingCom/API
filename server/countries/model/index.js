import CountrySchema from '../schema/index.js';

class Country {
  async find(selectors = {}, options = {}) {
    let { limit, skip, sort } = options;

    const result = await CountrySchema.find(selectors)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, populationList = []) {
    const result = await CountrySchema.findOne(selector).lean().populate(populationList);
    return result;
  }

  async create(payload) {
    const result = await CountrySchema.create(payload);
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
    const result = await CountrySchema.deleteOne(selector, options);
    return result;
  }
}

export default new Country();
