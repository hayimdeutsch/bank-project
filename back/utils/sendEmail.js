import { codeExpiryMins, transporter } from "../config.js";



export const sendConfirmationCode = function (recipientEmail, code) {
  let text = `Your confirmation code is ${code}.\nIt will be valid for`+ 
            ` ${codeExpiryMins} minutes.`;
  sendEmail(recipientEmail, "MoBank Confirmation Code", text);
}

export const sendEmail = function (recipient, subject, bodyText) {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    subject: subject,
    to: recipient, 
    text: bodyText
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
    }
  );
}