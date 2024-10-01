import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helper/constant.js';
import profileService from '../services/profileService.js';
import logger from '../../../common/utils/logger/index.js';

export default {
  [CONTROLLERS.GET_PROFILE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await profileService.getProfile(userId);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.UPDATE_PROFILE]: async (req, res, next) => {
    try {
      const userId = _.get(req, 'user._id', null);
      const data = await profileService.updateProfile(userId, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
