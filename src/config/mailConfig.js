import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const username = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: username,
    pass
  }
});

const sendMail = (req, res, body) => {
  const allRecipientEmail = body.receiver.join(', ');
  const mailOptions = {
    from: email,
    to: allRecipientEmail,
    subject: body.subject,
    text: body.text,
    html: body.html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ error });
    }
    return res.json({ info });
  });
};

export default sendMail;
