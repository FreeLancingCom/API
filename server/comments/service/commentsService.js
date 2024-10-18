import Comment from '../model/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';

import USER from '../../users/model/index.js';
import Product from '../../products/models/index.js';
import Package from '../../package/model/index.js';

import { commentsError } from '../helper/constant.js';

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;

import logger from '../../../common/utils/logger/index.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

class CommentService {
  async listComments(productId , query) {
    const { limit, skip, sort, ..._query } = query;
    const options = getPaginationAndSortingOptions(query);
    try {
      const comments = await Comment.find({productId:productId}, options);

      return { comments, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async addComment(body , userId) {
    try {
       const isUserExist = await USER.findOne({ _id: userId });
        if (!isUserExist) {
          throw new ErrorResponse(
            commentsError.USER_NOT_FOUND.message,
            BAD_REQUEST,
            commentsError.USER_NOT_FOUND.code
          );
        }

        const isProductExist = await Product.findOne({ _id: body['productId'] }) || await Package.findOne({ _id: body['productId'] });

        if(!isProductExist){
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
}

export default new CommentService();
