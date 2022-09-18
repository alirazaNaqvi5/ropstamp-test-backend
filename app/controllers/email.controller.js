const nodemailer = require('nodemailer');
require('dotenv').config();


// creating a transporter to send emails 
const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.smtp_email,
      pass: process.env.smtp_pass,
    },
  });


// sending email
exports.sendMail = (req, res) => {
    const { email } = req.body;
    const mailOptions = {
        from: 'ropstamp@test.com',
        to: email,
        subject: "ROPSTAMP - Email Verification AND Password Reset",
        text: "Thanks for signing up with ROPSTAMP. your login infor for test web designed by ALi Naqvi is EMAIL: " + email + " PASSWORD: " + (Math.random() + 1).toString(36).substring(2),
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
};

