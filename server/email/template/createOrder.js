
export default function (params) {
    const { username, orderId, orderLink, orderDetails, totalPrice } = params;

    return `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
                  line-height: 1.6;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 700px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 15px;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background-color: purple;
                  color: white;
                  text-align: center;
                  padding: 30px;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .header p {
                  margin-top: 10px;
                  opacity: 0.9;
                color: white;

              }
              .order-info {
                  padding: 25px;
                  background-color: #f8f9fa;
                  border-bottom: 1px solid #e9ecef;
                  text-align:right;

              }
              .order-info h2 {
                  color: #007bff;
                  text-align:right;
                  margin-bottom: 15px;
              }
              .order-link {
                  display: inline-block;
                  background-color: #28a745;
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 10px;
                  direction : rtl;
              }
              .order-details {
                  width: 100%;
                  border-collapse: separate;
                  border-spacing: 0;
                  margin: 20px 0;
              }
              .order-details th, .order-details td {
                  padding: 12px;
                  text-align: right;
                  border-bottom: 1px solid #e9ecef;
              }
              .order-details th {
                  background-color: #f1f3f5;
                  font-weight: 600;
                  color: #495057;
              }
              .order-details tbody tr:nth-child(even) {
                  background-color: #f8f9fa;
              }
              .order-details tfoot tr {
                  font-weight: bold;
                  background-color: #e9ecef;
              }
              .order-footer {
                  text-align: center;
                  padding: 25px;
                  background-color: #f1f3f5;
                  color: #6c757d;
              }
              .order-footer a {
                  color: #007bff;
                  text-decoration: none;
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>${username} شكراً على طلبك</h1>
                  <p>تم إنشاء طلبك بنجاح. يمكنك متابعة تفاصيل طلبك أدناه</p>
              </div>
              
              <div class="order-info">
                  <h2>${orderId} رقم الطلب </h2>
                  <p>يمكنك تتبع طلبك أو عرض المزيد من التفاصيل بالنقر على الرابط أدناه</p>
                  <a href="${orderLink}" target="_blank" class="order-link">عرض الطلب</a>
              </div>

              <table class="order-details" dir="rtl">
                  <thead>
                      <tr>
                          <th>اسم المنتج</th>
                          <th>الكمية</th>
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
                          <td colspan="3">الإجمالي</td>
                          <td>${totalPrice.toFixed(2)}</td>
                      </tr>
                  </tfoot>
              </table>

              <div class="order-footer">
                  <p>إذا كانت لديك أي أسئلة، لا تتردد في التواصل معنا </p>
                  <p>شكرًا لاختيارك خدماتنا</p>
              </div>
          </div>
      </body>
      </html>
    `;
}