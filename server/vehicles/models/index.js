import VehicleSchema from '../schema/index.js';

class Vehciles {
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await VehicleSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await VehicleSchema.findOne(selector).select(projection).lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await VehicleSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await VehicleSchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await VehicleSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await VehicleSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await VehicleSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await VehicleSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Vehciles();
