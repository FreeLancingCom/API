import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../../../common/utils/errorResponse/index.js";
import { emailError } from "../helper/constant.js";

export default function (params) {

    const { username, link, language } = params;

    if(!username || !link) {
        throw new ErrorResponse(
            emailError.EMAIL_DETAILS_NOT_PROVIDED.message,
            StatusCodes.BAD_REQUEST,
            emailError.EMAIL_DETAILS_NOT_PROVIDED.code
        );
    }

    const translations = {
        en: {
            title: "Reset Your Password",
            greeting: `Dear ${username},`,
            body: "We received a request to reset your password. Use the Link below to reset your password:",
            button: "Reset Password",
            warning: "If you did not request a password reset, please ignore this email or contact support if you have questions.",
            thanks: "Thanks,",
            team: "The Her Style Team",
            footer: "© 2024 Her Style. All rights reserved.",
            address: "Her Style Address" // TODO: add the real address here 
        },
        ar: {
            title: "إعادة تعيين كلمة المرور",
            greeting: `عزيزي ${username},`,
            body: "لقد تلقينا طلبًا لإعادة تعيين كلمة مرورك. استخدم رمز OTP أدناه لإعادة تعيين كلمة مرورك:",
            button: "إعادة تعيين كلمة المرور",
            warning: "إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني أو الاتصال بالدعم إذا كان لديك أي أسئلة.",
            thanks: "شكرا،",
            team: "فريق Her Style",
            footer: "© 2024 Her Style. جميع الحقوق محفوظة.",
            address: "عنوان Her Style"
        }
    };

    // Select the correct translation based on the provided language
    const lang = language === 'ar' ? translations.ar : translations.en;

    return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
        <title>${lang.title}</title>
        <style>
            body {
                font-family: ${language === 'ar' ? 'Tahoma, "Segoe UI"' : 'Arial, sans-serif'};
                direction: ${language === 'ar' ? 'rtl' : 'ltr'};
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 28px;
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                font-size: 16px;
                color: #ffffff;
                background-color: #28a745;
                text-decoration: none;
                border-radius: 5px;
            }
            a {
                color: white !important;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777777;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
            <img src="https://freeimage.host/i/dDgAIBn" alt="Her Style Logo">
            </div>
            <h1>${lang.title}</h1>
            <p>${lang.greeting}</p>
            <p>${lang.body}</p>
            <p style="color:red !important">reset password link <a href=${link}>Rest your Password</a></p>
            <p>${lang.warning}</p>
            <p>${lang.thanks}<br>${lang.team}</p>
            <div class="footer">
                <p>${lang.footer}</p>
                <p>${lang.address}</p>
            </div>
        </div>
    </body>
    </html>
    `;
}