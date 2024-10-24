import cartSchema from '../schema/index.js';

class Cart {
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await cartSchema
      .find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .populate({
        path: 'products.productId'
      })
      .populate({
        path: 'userId',
        select: 'name phoneNumber email '
      })
      .populate('packages.packageId')
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await cartSchema
      .findOne(selector)
      .select(projection)
      .populate(populationList)
      .lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await cartSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await cartSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await cartSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await cartSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await cartSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await cartSchema
      .aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }

  async distinct(field, selector = {}) {
    const result = await cartSchema.distinct(field, selector);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await cartSchema.deleteMany(selector, options);
    return result;
  }
  async countDocuments(selector) {
    const data = await cartSchema.countDocuments(selector);
    return data;
  }
}

export default new Cart();
