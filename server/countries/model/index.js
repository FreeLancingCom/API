import UserSchema from '../schema/index.js';

class Country {
  async find(selectors = {}, options = {}) {
    let { limit, skip, sort } = options;

    const result = await UserSchema.find(selectors)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, populationList = []) {
    const result = await UserSchema.findOne(selector).lean().populate(populationList);
    return result;
  }

  async create(payload) {
    const result = await UserSchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await UserSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async update(payload, options = {}) {
    const result = await UserSchema.updateOne(payload, options);
    return result;
  }

  async delete(selector, options = {}) {
    const result = await UserSchema.deleteOne(selector, options);
    return result;
  }
}

export default new Country();
