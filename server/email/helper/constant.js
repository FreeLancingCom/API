
import TEMPLATES from '../template/index.js';
const HER_STYLE = 'Hawaak Store';



export const CONTROLLERS = {
  SEND_EMAIL: 'admin:sendEmail'
};

export const emailError = Object.freeze({
  EMAIL_NOT_SENT: {
    code: 100,
    message: 'Email not sent'
  },
  EMAIL_DETAILS_NOT_PROVIDED: {
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
  },
  CREATE_ORDER: {
    template: TEMPLATES.cretedOrder,
    subject: 'شكراً لك على إختيار متجرنا - متجر هواك',
    sender: HER_STYLE
  },
  DELIVERY_CREATE_ORDER: {
    template: TEMPLATES.deliveryOrder,
    subject: 'طلب جديد للتوصيل - متجر هواك',
    sender: HER_STYLE
  }


};