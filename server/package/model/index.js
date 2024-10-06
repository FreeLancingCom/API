import PackageSchema from '../schema/index.js';

class PackageModel {
  async find(selector = {}, options = {}) {
    const { limit, skip, sort } = options;
    const data = await PackageSchema.find(selector, null, {
      limit,
      skip,
      sort
    })
      .lean()
      .maxTimeMS(10000);
    return data;
  }

  async create(body) {
    const data = await PackageSchema.create(body);
    return data;
  }

  async update(selector, newParams, options = {}) {
    const result = await PackageSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async findOne(selector) {
    const data = await PackageSchema.findOne(selector);
    return data;
  }

  async delete(selector) {
    const data = await PackageSchema.deleteOne(selector);
    return data;
  }
  async count(selector) {
    const data = await PackageSchema.countDocuments(selector);
    return data;
  }
  async countDocuments(selector) {
    const data = await PackageSchema.countDocuments(selector);
    return data;
  }
}


export default new PackageModel();