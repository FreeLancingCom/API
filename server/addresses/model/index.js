import AddressSchema from '../schema/index.js';

class Address {
    
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await AddressSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await AddressSchema.findOne(selector).select(projection).populate(populationList).lean();
    return result;
  }

  async count(selectors = {}) {
    const result =
      await AddressSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await AddressSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await AddressSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await AddressSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await AddressSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await AddressSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }

  async distinct(field, selector = {}) {
    const result = await AddressSchema.distinct(field, selector);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await AddressSchema.deleteMany(selector, options);
    return result;
  }
}

export default new Address();