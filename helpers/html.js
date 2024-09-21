const signUpTemplate = (verifyLink, firstName) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome tO NECTAR-BUZZ!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          .header {
            background: #007bff;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #fff;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            background: #333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ccc;
          }
          .button {
            display: inline-block;
            background-color: #ff9900;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          n<div class="header">
           <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
            <h1>Welcome To NECTAR-BUZZ </h1>
          </div>
          <div class="content">
            <p>Hello ${firstName},</p>
            <p>Thank you for joining our community! We're thrilled to have you on board.</p>
            <p>Please click the button below to verify your account:</p>
            <p>
              <a href="${verifyLink}" class="button">Verify My Account</a>
            </p>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br>NECTAR-BUZZ Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NECTAR-BUZZ Corp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const signUpFarmerTemplate = (verifyLink, firstName) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome tO NECTAR-BUZZ!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          .header {
            background: #007bff;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #fff;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            background: #333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ccc;
          }
          .button {
            display: inline-block;
            background-color: #ff9900;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
            <h1>Welcome To NECTAR-BUZZ</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName},</p>
            <p>Thank you for joining our community! We're thrilled to have you on board.</p>
            <p>Please click the button below to verify your account:</p>
            <p>
              <a href="${verifyLink}" class="button">Verify My Account</a>
            </p>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br>NECTAR-BUZZ Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NECTAR-BUZZ Corp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  
  
  const verifyTemplate = (verifyLink, firstName) => {
      return `
      <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Welcome To NECTAR-BUZZ</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        background-color: #fff;
      }
      .header {
        background: #007bff;
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        color: #fff;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .footer {
        background: #333;
        padding: 10px;
        text-align: center;
        border-top: 1px solid #ddd;
        font-size: 0.9em;
        color: #ccc;
      }
      .button {
        display: inline-block;
        background-color: #ff9900;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
      }
      </style>
      </head>
    <body>
      <div class="container">
        <div class="header">
        <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
          <h1>Verify Your Account</h1>
        </div>
        <div class="content">
          <p>Hello ${firstName},</p>
          <p>We're excited to have you on board! Please click the button below to verify your account:</p>
          <p>
            <a href="${verifyLink}" class="button">Verify My Account</a>
          </p>
          <p>If you did not create an account, please ignore this email.</p>
          <p>Best regards,<br>NECTAR-BUZZ Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()}NECTAR-BUZZ Corp. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
  const forgotPasswordTemplate = (resetLink, firstName) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          .header {
            background: #007bff;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #fff;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            background: #333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ccc;
          }
          .button {
            display: inline-block;
            background-color: #ff9900;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName},</p>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>Click the button below to reset your password:</p>
            <p>
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>Best regards,<br>NECTAR-BUZZ Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()}NECTAR-BUZZ Corp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  const changePasswordTemplate = (resetLink, firstName) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password was changed successfully</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          .header {
            background: #007bff;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #ddd;
            color: #fff;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            background: #333;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #ccc;
          }
          .button {
            display: inline-block;
            background-color: #ff9900;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName},</p>
            <p>The request to change your password was succesful.</p>
            <p>
              <a>Password Changed</a>
            </p>
            <p>Best regards,<br>NECTAR-BUZZ Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()}NECTAR-BUZZ Corp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  
function orderMailTemplate(firstName, orderId, orderDate, items, total) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Reset some default styles for consistency */
      body, p {
        margin: 0;
        padding: 0;
      }
  
      /* Container styles */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #e0e0e0;
        font-family: Arial, sans-serif;
      }
  
      /* Header styles */
      .header {
        text-align: center;
        padding: 10px 0;
      }
  
      /* Logo styles */
      .logo {
        max-width: 220px;
        height: auto;
      }
  
      /* Content styles */
      .content {
        margin-top: 20px;
        padding: 20px;
        background-color: #f7f7f7;
      }
  
      /* Order details styles */
      .order-details {
        margin-bottom: 20px;
      }
  
      /* Footer styles */
      .footer {
        text-align: center;
        padding: 10px 0;
        background-color: #e0e0e0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
        <h1>Order Confirmation</h1>
      </div>
      <div class="content">
        <p>Dear ${firstName},</p>
        <p>Your order has been successfully placed!</p>
        <div class="order-details">
          <h2>Order Details:</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${orderDate}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <p><strong>Total Amount:</strong> &#8358; ${total}</p>
        </div>
        <p>Thank you for choosing us for your meal!</p>
      </div>
      <div class="footer">
        <p>If you have any questions, please contact us at nectarbuzz1@gmail.com.</p>
      </div>
    </div>
  </body>
  </html>
  
  `;
}


function restaurantOrderMailTemplate(firstName, email, address, orderId, orderDate, items, total) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Reset some default styles for consistency */
      body, p {
        margin: 0;
        padding: 0;
      }
  
      /* Container styles */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #e0e0e0;
        font-family: Arial, sans-serif;
      }
  
      /* Header styles */
      .header {
        text-align: center;
        padding: 10px 0;
      }
  
      /* Logo styles */
      .logo {
        max-width: 220px;
        height: auto;
      }
  
      /* Content styles */
      .content {
        margin-top: 20px;
        padding: 20px;
        background-color: #f7f7f7;
      }
  
      /* Order details styles */
      .order-details {
        margin-bottom: 20px;
      }
  
      /* Footer styles */
      .footer {
        text-align: center;
        padding: 10px 0;
        background-color: #e0e0e0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dpepylcw3/image/upload/v1726921647/zlzfrxqi41hkyiijpnwl.png" alt="Food Logo" class="logo">
        <h1>New Order Received</h1>
      </div>
      <div class="content">
        <p>Dear Restaurant Team,</p>
        <p>A new order has been placed by ${firstName} (${email}).</p>
        <div class="order-details">
          <h2>Order Details:</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${orderDate}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <p><strong>Total Amount:</strong> &#8358; ${total}</p>
          <p><strong>Delivery Address:</strong> ${address}</p>
        </div>
        <p>Please prepare the order and contact the customer for delivery or pickup details.</p>
      </div>
      <div class="footer">
        <p>If you have any questions, please contact the customer at their provided email address.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}




  
  module.exports = { signUpTemplate, verifyTemplate, forgotPasswordTemplate, changePasswordTemplate, orderMailTemplate, restaurantOrderMailTemplate, signUpFarmerTemplate};
  