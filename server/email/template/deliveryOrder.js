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

    return `
      <!DOCTYPE html>
      <html lang="ar">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>طلب توصيل</title>
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
                  text-align: center;
                  color: #333;
              }
              .order-info p {
                  font-size: 14px;
                  color: #555;
                  line-height: 1.6;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="your-logo-url" alt="Logo">
              </div>
              <div class="order-info">
                  <h2>تفاصيل الطلب</h2>
                  <p><strong>اسم العميل:</strong> ${username}</p>
                  p><strong>رقم الهاتف:</strong> ${phoneNumber}</p>
                  <p><strong>العنوان:</strong> ${addressFirstLine}, ${street}, ${city}, ${postalCode}, ${country}</p>
                  <p><strong>موقع جوجل:</strong> <a href="${googleLocation}">رابط الموقع</a></p>
                  <p><strong>رقم الطلب:</strong> ${orderId}</p>
                  <p><strong>طريقة الدفع:</strong> ${paymentMethod}</p>
                  <p><strong>حالة الدفع:</strong> ${paymentStatus}</p>
                  <p><strong>وقت استلام الطلب:</strong> ${requestReceived}</p>
                  <p><strong>السعر الإجمالي:</strong> ${totalPrice}</p>
              </div>
          </div>
          <div class="container">
                <div class="order-info">
                    <h2>الفاتوره</h2>
                    <table class="order-details" border="2">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية</th>
                                <th>السعر </th>
                                <th>السعر الكلي </th>

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
                                <td colspan="2">السعر الإجمالي</td>
                                <td>${totalPrice}</td>
                            </tr>
                    </table>
                </div>
            </div>

      </body>
      </html>
    `;
}
