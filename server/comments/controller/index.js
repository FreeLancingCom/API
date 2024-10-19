import CommentService from '../service/commentsService.js';
import { CONTROLLERS } from '../helper/constant.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';

export default {
  
  [CONTROLLERS.LIST_ALL_COMMENTS]: async (req, res, next) => {
    try {
      const data = await CommentService.listAllComments(req.query);
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.LIST_COMMENTS]: async (req, res, next) => {
     try{
         const data = await CommentService.listComments(req.params.id, req.query);
         return res.status(StatusCodes.OK).json({ success: true, data });      
     }
     catch(error){
        logger.error(error);
        next(error);
     }
  },
  [CONTROLLERS.ADD_COMMENT]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id' , null);
      const data = await CommentService.addComment(req.body, userId); // frontend send me in the body the productId
      return res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  
};
