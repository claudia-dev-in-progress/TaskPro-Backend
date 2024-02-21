const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const config = {
  host: "smtp.office365.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.OUTLOOK_EMAIL,

    pass: process.env.OUTLOOK_PASSWORD,
  },
};

const sendHelpEmail = (email, comment) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: email,
    to: process.env.OUTLOOK_EMAIL,
    subject: "Help needed",
    text: comment,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = {
  sendHelpEmail,
};
