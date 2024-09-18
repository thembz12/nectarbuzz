

const { options } = require("@hapi/joi")
const nodeMailer = require(`nodemailer`) 

require ("dotenv").config()

const sendMail =async (options)=>{

const transporter = await nodeMailer.createTransport(
    {    
     secure: true,
      service :  process.env.SERVICE,
     
 auth: {
         user:process.env.mail_id,
          pass:process.env.mail_password  ,
        },
      }
    
)


let mailOptions = {
    from: process.env.mail_id,
    to: options.email,
    subject: options.subject,
    // text: options.message
  html:options.html
//   
}
  await transporter.sendMail(mailOptions)

}


    // Configure the transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user:process.env.mail_id, // Admin email (environment variable)
        pass:process.env.mail_password // Admin email password (environment variable)
      }
    });

    // Email content for the user
    const userMailOptions = {
      from: process.env.mail_id,
      to: options.email,
      subject: options.subject,
      // text: options.message
    html:options.html
    };

    // Email content for the admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL, // Sender address
      to: process.env.ADMIN_EMAIL, // Admin's email
      subject: 'New Order Received',
      text: `A new order has been placed by ${customerName}.\nOrder total: $${grandTotal}.\nOrder ID: ${orderId}.\nCashback earned by the user: $${cashbackEarned.toFixed(2)}.\n\nPlease review and process the order.`
    };

    // Send email to the user
    await transporter.sendMail(userMailOptions);

    // Send email to the admin
    await transporter.sendMail(adminMailOptions);

    console.log('Emails sent to user and admin successfully.');
  } catch (error) {
    console.error('Error sending email notifications:', error);
  }
};




module.exports = sendMail