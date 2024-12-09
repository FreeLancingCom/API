import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import DeliveryEmailService from '../service/deliverEmailService.js';
import logger from '../../../common/utils/logger/index.js';



export default {
    [CONTROLLERS.CREATE_DELIVERY_EMAIL]: async (req, res, next) => {
        try {
            const data = await DeliveryEmailService.createDeliveryEmail(req.body);
            res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    [CONTROLLERS.LIST_DELIVERY_EMAILS]: async (req, res, next) => {
        try {
            const data = await DeliveryEmailService.listDeliveryEmails(req.query);
            res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    [CONTROLLERS.GET_DELIVERY_EMAIL]: async (req, res, next) => {
        try {
            const data = await DeliveryEmailService.getDeliveryEmail(req.params.id);
            res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    [CONTROLLERS.UPDATE_DELIVERY_EMAIL]: async (req, res, next) => {
        try {
            const data = await DeliveryEmailService.updateDeliveryEmail(req.params.id, req.body);
            res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    [CONTROLLERS.DELETE_DELIVERY_EMAIL]: async (req, res, next) => {
        try {
            const data = await DeliveryEmailService.deleteDeliveryEmail(req.params.id);
            res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}