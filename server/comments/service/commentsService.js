import Comment from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import mongoose from 'mongoose';
import USER from '../../users/model/index.js';
import Product from '../../products/models/index.js';
import Package from '../../package/model/index.js';
import ProductModel from '../../products/models/index.js';

import { commentsError } from '../helper/constant.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

class CommentService {

  async listAllComments(query) {
    const { limit, skip, sort, page, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const comments = await Comment.find({}, options);

      return { comments, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async listComments(productId, query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const comments = await Comment.find({ productId: productId }, options);

      return { comments, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async addComment(body, userId) {
    try {
      const isUserExist = await USER.findOne({ _id: userId });
      await this.calculateAndUpdateProductStars(body['productId']);
      if (!isUserExist) {
        throw new ErrorResponse(
          commentsError.USER_NOT_FOUND.message,
          BAD_REQUEST,
          commentsError.USER_NOT_FOUND.code
        );
      }

      const isProductExist = await Product.findOne({ _id: body['productId'] }) || await Package.findOne({ _id: body['productId'] });

      if (!isProductExist) {
        throw new ErrorResponse(
          commentsError.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          commentsError.PRODUCT_NOT_FOUND.code
        );
      }

      body['userId'] = userId;
      const comment = await Comment.create(body);
      return comment;
    }
    catch (e) {
      logger.error(e);
      throw e;
    }
  }
  async countComments(productId) {
    try {
      const count = await Comment.countDocuments({ productId: productId });
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async calculateAverageStarsForProduct(productId) {
    try {
      const objectId = new mongoose.Types.ObjectId(productId);
      const pipeline = [
        {
          $match: {
            productId: objectId,
            stars: { $gte: 1, $lte: 5 }
          }
        },
        {
          $group: {
            _id: null,
            totalStars: { $sum: "$stars" },
            totalCount: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            averageStars: {
              $round: [
                { $cond: { if: { $eq: ["$totalCount", 0] }, then: 0, else: { $divide: ["$totalStars", "$totalCount"] } } },
                0
              ]
            }
          }
        }
      ];

      const result = await Comment.aggregate(pipeline);

      // Return the rounded average or 0 if no comments matched
      return result[0]?.averageStars || 0;
    } catch (e) {
      console.error("Error in calculateAverageStarsForProduct:", e);
      throw e;
    }
  }

  async calculateAndUpdateProductStars(productId) {
    const comments = await Comment.find({ productId });
    if (comments.length === 0) {
      await ProductModel.update({ _id: productId }, { stars: 0 });
      return;
    }
    else {
      const averageStars = await this.calculateAverageStarsForProduct(productId);
      await ProductModel.update({ _id: productId }, { stars: averageStars });
      await Package.update({ _id: productId }, { stars: averageStars });
    }

  }




}

export default new CommentService();
