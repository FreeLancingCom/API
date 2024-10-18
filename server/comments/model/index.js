import CommentSchema from '../schema/index.js';

class Comment {
  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await CommentSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .populate('userId', 'name')
      .maxTimeMS(60000)
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    const result = await CommentSchema.findOne(selector)
      .select(projection)
      .populate(populationList)
      .lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await CommentSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await CommentSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await CommentSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await CommentSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await CommentSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await CommentSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }

  async distinct(field, selector = {}) {
    const result = await CommentSchema.distinct(field, selector);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await CommentSchema.deleteMany(selector, options);
    return result;
  }
}

export default new Comment();
