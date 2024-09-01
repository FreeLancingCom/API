import ReviewSchema from '../schema/index.js';
class Review {
  async find(selectors = {}, options = {}) {
    let { limit, skip, sort, projection } = options;

    const result = await ReviewSchema.find(selectors)
      .select(projection)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await ReviewSchema.findOne(selector).select(projection).lean().populate(populationList);
    return result;
  }

  async findOneAndIncludeOTP(selector = {}, projection = {}, populationList = []) {
    const result = await ReviewSchema.findOne(selector).select(projection).lean().populate(populationList);
    return result;
  }

  async count(selectors = {}) {
    const result = await ReviewSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {

    const result = await ReviewSchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await ReviewSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await ReviewSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await ReviewSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await ReviewSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Review();
