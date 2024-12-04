import sliderModel from '../models/index.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';


import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;
import { slidersErrors } from '../helpers/constants.js';

import logger from '../../../common/utils/logger/index.js';


class SliderService {
    async createSlider(body) {
        try {
            const slider = await sliderModel.create(body);
            return slider;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async listSliders(query) {
        const { limit, skip, sort, page, ..._query } = query;
        const options = getPaginationAndSortingOptions(query);
        try {
            const sliders = await sliderModel.find(_query, options);
            return { sliders, options };
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async getSlider(sliderId) {
        try {
            const slider = await sliderModel.findOne({ _id: sliderId });
            if (!slider) {
                throw new ErrorResponse(
                    slidersErrors.SLIDER_NOT_FOUND.message,
                    BAD_REQUEST,
                    slidersErrors.SLIDER_NOT_FOUND.code
                );
            }
            return slider;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async updateSlider(sliderId, body) {
        try {
            const slider = await sliderModel.update({ _id: sliderId }, body, { new: true });
            if (!slider) {
                throw new ErrorResponse(
                    slidersErrors.SLIDER_NOT_FOUND.message,
                    BAD_REQUEST,
                    slidersErrors.SLIDER_NOT_FOUND.code
                );
            }
            return slider;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async deleteSlider(sliderId) {
        try {
            const slider = await sliderModel.delete({ _id: sliderId });
            if (!slider) {
                throw new ErrorResponse(
                    slidersErrors.SLIDER_NOT_FOUND.message,
                    BAD_REQUEST,
                    slidersErrors.SLIDER_NOT_FOUND.code
                );
            }
            return slider;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}

export default new SliderService();