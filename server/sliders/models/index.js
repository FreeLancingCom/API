import sliderSchema from '../schema/index.js';

class SLIDER {
    
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await sliderSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await sliderSchema.findOne(selector).select(projection).populate(populationList).lean();
    return result;
  }

  async count(selectors = {}) {
    const result =
      await sliderSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await sliderSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await sliderSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await sliderSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await sliderSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await sliderSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }

  async distinct(field, selector = {}) {
    const result = await sliderSchema.distinct(field, selector);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await sliderSchema.deleteMany(selector, options);
    return result;
  }
}

export default new SLIDER();