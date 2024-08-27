import ServiceTemplatesSchema from '../schema/index.js';

class ServiceTemplatesModel {
  async find(selectors = {}, options = {}, populationList = []) {
    const { limit, skip, sort, projection } = options;
    const result = await ServiceTemplatesSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit || 100)
      .skip(skip || 0)
      .lean()
      .populate(populationList)
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await ServiceTemplatesSchema.findOne(selector).select(projection).lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await ServiceTemplatesSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await ServiceTemplatesSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await ServiceTemplatesSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await ServiceTemplatesSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await ServiceTemplatesSchema.deleteOne(selector, options);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await ServiceTemplatesSchema.deleteMany(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await ServiceTemplatesSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new ServiceTemplatesModel();
