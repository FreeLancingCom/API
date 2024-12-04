import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helpers/constants.js';
import sliderService from '../service/sliderService.js';
import logger from '../../../common/utils/logger/index.js';



export default{
    [CONTROLLERS.CREATE_SLIDER]: async (req, res, next) => {
        try {
        const data = await sliderService.createSlider(req.body);
        res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
        logger.error(error);
        next(error);
        }
    },
    [CONTROLLERS.LIST_SLIDERS]: async (req, res, next) => {
        try {
        const data = await sliderService.listSliders(req.query);
        res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
        logger.error(error);
        next(error);
        }
    },
    [CONTROLLERS.GET_SLIDER]: async (req, res, next) => {
        try {
        const data = await sliderService.getSlider(req.params.id);
        res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
        logger.error(error);
        next(error);
        }
    },
    [CONTROLLERS.UPDATE_SLIDER]: async (req, res, next) => {
        try {
        const data = await sliderService.updateSlider(req.params.id, req.body);
        res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
        logger.error(error);
        next(error);
        }
    },
    [CONTROLLERS.DELETE_SLIDER]: async (req, res, next) => {
        try {
        const data = await sliderService.deleteSlider(req.params.id);
        res.status(StatusCodes.OK).json({ success: true, data });
        } catch (error) {
        logger.error(error);
        next(error);
        }
    }
}