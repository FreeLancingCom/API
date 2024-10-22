import orderSchema from '../schema/index.js';

class Order {
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await orderSchema
      .find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .populate('user')
      .select('name email phoneNumber')
      .populate('cart')
      .select('products packages totalPrice')
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await orderSchema
      .findOne(selector)
      .select(projection)
      .populate('user')
      .select('name email')
      .populate('cart')
      .select('products packages totalPrice')
      .lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await orderSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await orderSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await orderSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await orderSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await orderSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await orderSchema
      .aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Order();
