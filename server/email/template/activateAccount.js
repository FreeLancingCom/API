export default function (params) {
    const { username, link } = params;
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Activate Your Account</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #e9ecef;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
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
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header img {
                  max-width: 150px;
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
                  text-align: center;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #777777;
                  text-align: center;
              }
              @media screen and (max-width: 600px) {
                  .container {
                      padding: 20px;
                  }
                  h1 {
                      font-size: 24px;
                  }
                  p {
                      font-size: 14px;
                  }
                  .button {
                      padding: 10px 20px;
                      font-size: 14px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="dsffds"alt="herStyleLogo">
              </div>
              <h1>Activate Your Account</h1>
              <p>Dear ${username},</p>
              <p>Thank you for signing up. To complete your registration, please copy the code below:</p>
              <p>reset password link <a href=${link}>Rest your Password</a></p>
              <p>If you did not sign up for this account, please ignore this email.</p>
              <p>Thanks,<br>Road APP Team</p>
              <div class="footer">
                  <p>&copy; 2024 Road APP. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  }
  