export default function (params) {
    const { username, orderId, orderLink, orderDetails , totalPrice } = params;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
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
              .order-info {
                  margin-top: 20px;
                  padding: 20px;
                  background-color: #f9f9f9;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .order-info h2 {
                  font-size: 20px;
                  margin-bottom: 10px;
              }
              .order-details {
                  margin-top: 20px;
                  border-collapse: collapse;
                  width: 100%;
              }
              .order-details th, .order-details td {
                  padding: 10px;
                  text-align: left;
                  border: 1px solid #ddd;
              }
              .order-details th {
                  background-color: #f2f2f2;
              }
              .order-details td {
                  background-color: #fafafa;
              }
              .order-footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 14px;
                  color: #777;
              }
              .order-footer a {
                  color: #007bff;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Thank you for your order, ${username}!</h1>
                  <p>Your order has been successfully created. You can track your order details below:</p>
              </div>
              
              <div class="order-info">
                  <h2>Order ID: ${orderId}</h2>
  <p>You can track your order or view more details by clicking the link below:</p>
                  <a class="" href="${orderLink}" target="_blank">View Order</a>
              </div>

              <table class="order-details">
                  <thead>
                      <tr>
                          <th>اسم المنتج </th>
                          <th>الكميه</th>
                          <th>السعر</th>
                          <th>السعر الكلي</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${orderDetails.map(item => `
                          <tr>
                              <td>${item.name}</td>
                              <td>${item.quantity}</td>
                              <td>${item.price.toFixed(2)}</td>
                              <td>${item.total.toFixed(2)}</td>
                          </tr>
                      `).join('')}
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="3">الاجمالي</td>
                          <td>${totalPrice.toFixed(2)}</td>
                      </tr>
              </table>

              <div class="order-footer">
                  <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
                  <p>Thank you for choosing our service!</p>
              </div>
          </div>
      </body>
      </html>
    `;
}
