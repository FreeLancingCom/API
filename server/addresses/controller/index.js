import addressesService from '../service/addressesService.js';
import { CONTROLLERS } from '../helper/constant.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

import _ from 'lodash';



export default {

    [CONTROLLERS.LIST_ADDRESSES]: async (req, res, next) => {
        try {
          const user = _.get(req, 'user', null);
          const data = await addressesService.listAddresses(req.query , user);
          return res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
          logger.error(error);
          next(error);
        }
      },
    
      [CONTROLLERS.GET_ADDRESS]: async (req, res, next) => {
        try {
          const data = await addressesService.getAddress(req.params.id,);
          return res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
          logger.error(error);
          next(error);
        }
      },

        [CONTROLLERS.CREATE_ADDRESS]: async (req, res, next) => {
            try {
              const userId = _.get(req, 'user._id', null);
            const data = await addressesService.createAddress(req.body , userId);
            return res.status(StatusCodes.CREATED).json({ success: true, data });
            } catch (error) {
            logger.error(error);
            next(error);
            }
        },

        [CONTROLLERS.UPDATE_ADDRESS]: async (req, res, next) => {
            try {
            const data = await addressesService.updateAddress(req.params.id, req.body);
            return res.status(StatusCodes.OK).json({ success: true, data });
            } catch (error) {
            logger.error(error);
            next(error);
            }
        },

        [CONTROLLERS.DELETE_ADDRESS]: async (req, res, next) => {
            try {
            const data = await addressesService.deleteAddress(req.params.id);
            return res.status(StatusCodes.OK).json({ success: true, data });
            } catch (error) {
            logger.error(error);
            next(error);
            }
        },

};