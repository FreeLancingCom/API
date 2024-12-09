
export default function (params) {
    const {
        username,
        addressFirstLine,
        street,
        city,
        googleLocation,
        postalCode,
        country,
        totalPrice,
        paymentMethod,
        paymentStatus,
        requestReceived,
        phoneNumber,
        orderId,
        orderDetails
    } = params;
    const PAYMENT_METHODS = {
        COD: 'الدفع عند الإستلام',
        INSTANT: 'دفع إلكتروني',
        BANKAK: 'تطبيق بنكك',
    };
    return `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>طلب توصيل</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f7;
                  margin: 0;
                  padding: 20px;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 700px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 30px;
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
              .section {
                  margin-bottom: 20px;
                  padding: 20px;
                  background-color: #f9f9f9;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .section h2 {
                  text-align: center;
                  color: #333;
                  border-bottom: 2px solid #e0e0e0;
                  padding-bottom: 10px;
                  margin-bottom: 15px;
              }
              .details-table {
                  width: 100%;
                  border-collapse: collapse;
              }
              .details-table th, 
              .details-table td {
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: right;
              }
              .details-table th {
                  background-color: #f2f2f2;
                  font-weight: bold;
              }
              .order-details-table {
                  width: 100%;
                  border-collapse: collapse;
              }
              .order-details-table th, 
              .order-details-table td {
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: right;
              }
              .order-details-table th {
                  background-color: #f2f2f2;
                  font-weight: bold;
              }
              .total-row {
                  font-weight: bold;
                  background-color: #e0e0e0;
              }
                .khatem {
                    margin-top: 20px;
                }
                .khatem img{
                    max-width: 200px;
                    margin-top: 20px;
                    margin-right : auto;
                }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="https://iili.io/2MYmN0g.png" alt="Hawwak Logo">
              </div>
              
              <div class="section">
                  <h2>تفاصيل التوصيل</h2>
                  <table class="details-table">
                      <tr>
                      <td>${username}</td>
                      <th>اسم العميل</th>
                      </tr>
                      <tr>
                      <td>${phoneNumber}</td>
                      <th>رقم الهاتف</th>
                      </tr>
                      <tr>
                      <td>${addressFirstLine}, ${street}, ${city}, ${postalCode}, ${country}</td>
                      <th>العنوان</th>
                      </tr>
                      <tr>
                      <td><a href="${googleLocation}">رابط الموقع</a></td>
                      <th>موقع جوجل</th>
                      </tr>
                      <tr>
                      <td>${orderId}</td>
                      <th>رقم الطلب</th>
                      </tr>
                      <tr>
                      <td>${PAYMENT_METHODS[paymentMethod]}</td>
                      <th>طريقة الدفع</th>
                      </tr>
                      <tr>
                      <td>${requestReceived}</td>
                      <th>وقت استلام الطلب</th>
                      </tr>
                  </table>
              </div>
              
              <div class="section">
                  <h2>تفاصيل الطلب</h2>
                  <table class="order-details-table" dir="rtl">
                      <thead>
                          <tr>
                              <th>المنتج</th>
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
                          <tr class="total-row">
                              <td colspan="3">السعر الإجمالي</td>
                              <td>${totalPrice}</td>
                          </tr>
                      </tfoot>
                  </table>
              </div>
              <div class="khatem">
              <img src="https://iili.io/2McHkfS.png" alt="الختم"/>
              </div>
          </div>
      </body>
      </html>
    `;
}