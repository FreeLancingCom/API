import CouponSchema from '../schema/index.js';

class CouponsModel {
  async find(selector = {}, options = {}) {
    const { limit, skip, sort } = options;
    const data = await CouponSchema.find(selector, null, {
      limit,
      skip,
      sort
    })
      .lean()
      .maxTimeMS(10000);
    return data;
  }

  async create(body) {
    const data = await CouponSchema.create(body);
    return data;
  }

  async update(selector, newParams, options = {}) {
    const result = await CouponSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async findOne(selector) {
    const data = await CouponSchema.findOne(selector);
    return data;
  }

  async delete(selector) {
    const data = await CouponSchema.deleteOne(selector);
    return data;
  }

  async count(selector) {
    const data = await CouponSchema.countDocuments(selector);
    return data;
  }
}

export default new CouponsModel();
