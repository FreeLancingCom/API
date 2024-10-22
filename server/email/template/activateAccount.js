export default function (params) {
    const { username, link } = params;
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Activate Your Account</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f7;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 40px;
                  border-radius: 12px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 30px;
              }
              .header img {
                  max-width: 180px;
              }
              h1 {
                  font-size: 26px;
                  color: #2a2a2a;
                  margin-bottom: 20px;
                  text-align: center;
              }
              p {
                  font-size: 16px;
                  color: #555555;
                  line-height: 1.7;
                  margin: 16px 0;
              }
              .button {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 14px 28px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #28a745;
                  text-decoration: none;
                  border-radius: 6px;
                  text-align: center;
                  font-weight: bold;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .button:hover {
                  background-color: #218838;
              }
              a {
                  color: #ffffff;
                  text-decoration: none;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #777777;
                  text-align: center;
                  border-top: 1px solid #eaeaea;
                  padding-top: 20px;
              }
              .footer p {
                  margin: 5px 0;
              }
              @media screen and (max-width: 600px) {
                  .container {
                      padding: 20px;
                  }
                  h1 {
                      font-size: 22px;
                  }
                  p {
                      font-size: 14px;
                  }
                  .button {
                      padding: 12px 24px;
                      font-size: 14px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="https://iili.io/dDgAIBn.png" alt="HerStyle Logo">
              </div>
              <h1>Activate Your Account</h1>
              <p>Dear ${username},</p>
              <p>Thank you for signing up. To complete your registration, please click the link below to activate your account:</p>
              <a href="${link}" class="button">Activate Your Account</a>
              <p>If you did not sign up for this account, please ignore this email.</p>
              <p>Thanks,<br>HerStyle Team</p>
              <div class="footer">
                  <p>&copy; 2024 Her Style. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
}
