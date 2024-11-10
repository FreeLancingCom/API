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
    // Add sorting, skipping, and limiting as stages in the pipeline

    if (options.sort) {
      pipeline.push({ $sort: options.sort });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } }); // Default sorting by createdAt descending
    }
  
    if (options.skip) {
      pipeline.push({ $skip: options.skip });
    }
  
    if (options.limit) {
      pipeline.push({ $limit: options.limit });
    } else {
      pipeline.push({ $limit: 200 }); // Default limit if none specified
    }
  
    // Execute the aggregation with a maxTimeMS option
    const result = await CommentSchema.aggregate(pipeline).option({ maxTimeMS: 60000 });
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
  async countDocuments(selector) {
    const result = await CommentSchema.countDocuments(selector);
    return result;
  }
}

export default new Comment();
