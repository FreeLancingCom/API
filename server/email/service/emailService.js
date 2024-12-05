import { StatusCodes } from "http-status-codes";
import _ from 'lodash';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import logger from '../../../common/utils/logger/index.js';
import { EMAIL_CONFIG } from '../../../config/env/index.js'; 
import nodeMailer from 'nodemailer'
import { emailError } from "../helper/constant.js";
import TEMPLATES from "../template/index.js";
const serviceName = 'emails.services.index'

class EmailService{
     async sendEmail(targets, templateData, dynamicVars) {
        const functionName = 'sendEmail';
        logger.info(serviceName, functionName, `Sending email to ${targets.length} targets.`);
        try {
            if (!targets || !templateData)
                throw new ErrorResponse(
                    emailError.EMAIL_DETAILS_NOT_PROVIDED.message, 
                    StatusCodes.BAD_REQUEST,
                    emailError.EMAIL_DETAILS_NOT_PROVIDED.code
                );

            const { template, subject, sender } = templateData;


            this.EMAILS_USER = EMAIL_CONFIG.emailUser
            this.EMAILS_PASSWORD = EMAIL_CONFIG.emailPassword

            const content = template(dynamicVars);




            const transporter = nodeMailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                pool : true,
                secure: true,
                auth: {
                    user: this.EMAILS_USER,
                    pass: this.EMAILS_PASSWORD
                },
            
            });

            await transporter.sendMail({
            from: `${sender} <${this.EMAILS_USER}>`,
            to: targets,
            subject: subject,
            html: content
            });
            return { status: 'Email sent successfully' };
        } catch (error) {
            logger.error(error);
            throw new ErrorResponse(
                emailError.EMAIL_NOT_SENT.message,
                StatusCodes.INTERNAL_SERVER_ERROR,
                emailError.EMAIL_NOT_SENT.code
            ); 
        }
    }

}

export default new EmailService();
