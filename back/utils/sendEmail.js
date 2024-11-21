import { transporter } from "../config.js";

let mailOptions = {
  from: process.env.EMAIL_USERNAME,
  subject: 'Mo Bank Confirmation Code',
};

export const sendMail = function (recipientEmail, code) {
  mailOptions.to = recipientEmail;
  mailOptions.text = `Your confirmation code is ${code}.\nIt will be valid for`+ 
            ` ${process.env.CONFIRMATION_CODE_VALIDATION_TIME} minutes.`;

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}