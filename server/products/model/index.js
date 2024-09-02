import ProductSchema from '../schema/index.js';

class Product {
  async find(selectors = {}, options = {}, projection = {}) {
    const result = await ProductSchema.find(selectors, projection, options)
      .lean()
      .populate('maintenanceCenterId', 'name nameAr')
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await ProductSchema.findOne(selector).select(projection).lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await ProductSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await ProductSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await ProductSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await ProductSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await ProductSchema.deleteOne(selector, options);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await ProductSchema.deleteMany(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await ProductSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Product();
