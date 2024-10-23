
import TEMPLATES from '../template/index.js';
const HER_STYLE = 'Her Style';



export const CONTROLLERS = {
  SEND_EMAIL: 'admin:sendEmail'
};

export const emailError = Object.freeze({
  EMAIL_NOT_SENT: {
    code: 100,
    message: 'Email not sent'
  },
  EMAIL_DETAILS_NOT_PROVIDED : {
    code: 101,
    message: 'Email details not provided'
  }
});

export const EMAIL_TEMPLATES_DETAILS = {
  VERIFY_EMAIL: {
    template: TEMPLATES.activateAccount,
    subject: 'Email Verification',
    sender: HER_STYLE
  },
  RESET_PASSWORD: {
    template: TEMPLATES.resetPassword,
    subject: 'Reset Password',
    sender: HER_STYLE
  }
};