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

  async update(selector, body) {
    const data = await AddressSchema.updateOne(selector, body);
    return data;
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
