import AddressSchema from '../schema/index.js';

class AddressModel {
  async find(selector = {}, options = {}) {
    const { limit, skip, sort } = options;
    const data = await AddressSchema.find(selector, null, {
      limit,
      skip,
      sort
    })
      .lean()
      .maxTimeMS(10000);
    return data;
  }

  async create(body) {
    const data = await AddressSchema.create(body);
    return data;
  }

  async update(selector, newParams, options = {}) {
    const result = await AddressSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async findOne(selector) {
    const data = await AddressSchema.findOne(selector);
    return data;
  }

  async delete(selector) {
    const data = await AddressSchema.deleteOne(selector);
    return data;
  }
}

export default new AddressModel();
