import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";


export async function hashingString(password) {
    try {
        const hashSalt = await bcrypt.genSalt(10);
        const hashedStr = await bcrypt.hash(password + "", hashSalt);
        return hashedStr;
    } catch (err) {
        throw ({
            errCode: 1623,
            message: "Հեշավորումը ավարտվեց անհաջողությամբ"
        });
    }
}

export async function sendEmail(email, subject, content) {
    const mailConfig = {
      email: process.env.MY_YANDEX_MAIL_NAME || "",
      emailPassword: process.env.MY_YANDEX_MAIL_PASSWORD || ""
    };
 
    const transporter = nodemailer.createTransport({
      service: "Yandex",
      auth: {
        user: mailConfig.email,
        pass: mailConfig.emailPassword
      }
    });

    const mailOptions = {
      from: mailConfig.email,
      to: email,
      subject,
      text: content+""
    };
    await transporter.sendMail(mailOptions);
}

export function getResponseTemplate(){
  return {
    meta: {
      error: null,
      status: 200,
    },
    data: {}
  }
}
