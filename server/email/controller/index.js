import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { CONTROLLERS } from '../helper/constant.js';
import emailService from '../service/emailService.js';
import logger from '../../../common/utils/logger/index.js';
import { EMAIL_TEMPLATES_DETAILS } from '../helper/constant.js';



const { OK } = StatusCodes;


export default {
  [CONTROLLERS.SEND_EMAIL]: async (req, res, next) => {
    try {
      const { targets, templateData } = req.body;
      const templateDetails = EMAIL_TEMPLATES_DETAILS[templateData.templateKey];
            
      const { status } = await emailService.sendEmail(
        targets,
        templateDetails,
        templateData.dynamicVars
      );
      
      return res.status(OK).json({ status });
    } catch (error) {
       logger.error(error);
       next(error);
    }
  },

};