import ServiceTypeSchema from '../schema/index.js';

class ServiceType {
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await ServiceTypeSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await ServiceTypeSchema.findOne(selector).select(projection).lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await ServiceTypeSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await ServiceTypeSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await ServiceTypeSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await ServiceTypeSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await ServiceTypeSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await ServiceTypeSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new ServiceType();
