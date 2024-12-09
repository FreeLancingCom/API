import DeliveryEmailModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';


import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;
import { deliveryEmailsErrors } from '../helpers/constants.js';

import logger from '../../../common/utils/logger/index.js';


class DeliveryEmailService {
    async createDeliveryEmail(body) {
        try {
            const deliveryEmail = await DeliveryEmailModel.create(body);
            return deliveryEmail;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async listDeliveryEmails(query) {
        const { limit, skip, sort, page, ..._query } = query;
        const options = getPaginationAndSortingOptions(query);
        try {
            const deliveryEmails = await DeliveryEmailModel.find(_query, options);
            const count = await DeliveryEmailModel.count(_query);
            return { deliveryEmails, options: { ...options, count } };
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getDeliveryEmail(deliveryEmailId) {
        try {
            const deliveryEmail = await DeliveryEmailModel.findOne({ _id: deliveryEmailId });
            if (!deliveryEmail) {
                throw new ErrorResponse(
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.message,
                    BAD_REQUEST,
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.code
                );
            }
            return deliveryEmail;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async updateDeliveryEmail(deliveryEmailId, body) {
        try {
            const deliveryEmail = await DeliveryEmailModel.update({ _id: deliveryEmailId }, body, { new: true });
            if (!deliveryEmail) {
                throw new ErrorResponse(
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.message,
                    BAD_REQUEST,
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.code
                );
            }
            return deliveryEmail;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async deleteDeliveryEmail(deliveryEmailId) {
        try {
            const deliveryEmail = await DeliveryEmailModel.delete({ _id: deliveryEmailId });
            if (!deliveryEmail) {
                throw new ErrorResponse(
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.message,
                    BAD_REQUEST,
                    deliveryEmailsErrors.DELIVERY_EMAIL_NOT_FOUND.code
                );
            }
            return deliveryEmail;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}

export default new DeliveryEmailService();