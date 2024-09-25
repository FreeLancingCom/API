import RoadServiceSchema from '../schema/index.js';

class RoadServiceModel {
  async find(selector = {}, options = {}) {
    const { limit, skip, sort } = options;
    const data = await RoadServiceSchema.find(selector, null, {
      limit,
      skip,
      sort
    })
      .lean()
      .maxTimeMS(10000);
    return data;
  }

  async create(body) {
    const data = await RoadServiceSchema.create(body);
    return data;
  }

  async update(selector, newParams, options = {}) {
    const result = await RoadServiceSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async findOne(selector) {
    const data = await RoadServiceSchema.findOne(selector);
    return data;
  }

  async delete(selector) {
    const data = await RoadServiceSchema.deleteOne(selector);
    return data;
  }
  async count(selector) {
    const data = await RoadServiceSchema.countDocuments(selector);
    return data;
  }
}

export default new RoadServiceModel();
