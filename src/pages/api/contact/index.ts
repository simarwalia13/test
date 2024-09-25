import { GMAIL_PASS, GMAIL_USER } from '@/config';
import nodemailer from 'nodemailer';

// Send email function
export const sendEmail = async (
  recipients: string[],
  subject: string,
  template: string,
) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS,
        },
      });
      const mailOptions = {
        from: GMAIL_USER,
        to: recipients,
        subject: subject,
        html: template,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    } catch (error) {
      return reject(error);
    }
  });
};
