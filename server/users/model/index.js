import UserSchema from '../schema/index.js';
import { passwordProjection } from '../helpers/constant.js';
class User {
  async find(selectors = {}, options = {}) {
    let { limit, skip, sort, projection } = options;

    projection = {
      ...passwordProjection,
      ...projection
    };
    const result = await UserSchema.find(selectors)
      .select(projection)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findAndIncludeIds(selectors = {}, options = {}) {
    let { limit, skip, sort } = options;

    const projection = {
      _id: 1
    };
    const result = await UserSchema.find(selectors)
      .select(projection)
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}, populationList = []) {
    projection = {
      ...passwordProjection,
     ...projection
    };
    const result = await UserSchema.findOne(selector)
      .select(projection)
      .lean()
      .populate(populationList);

    return result;
  }

  async findOneAndIncludeOTP(selector = {}, projection = {}, populationList = []) {
    projection = {
      ...passwordProjection,
      ...projection
    };
    const result = await UserSchema.findOne(selector)
      .select(projection)
      .lean()
      .populate(populationList);

    return result;
  }

  async findOneAndIncludePassword(selector = {}, projection = {}, populationList = []) {
    projection = {
      ...projection
    };
    const result = await UserSchema.findOne(selector)
      .select(projection)
      .lean()
      .populate(populationList);
    return result;
  }

  async count(selectors = {}) {
    const result = await UserSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {

    const newUser = await UserSchema.create(payload);

    const result = await UserSchema.findOne({ _id: newUser._id })
    return result;
}
  async update(selector, newParams, options = {}) {
   

    const result = await UserSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      projection: {
        ...passwordProjection
      },
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await UserSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await UserSchema.deleteOne(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await UserSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }












}

export default new User();
