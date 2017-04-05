const config = require('../../config/auth')
//The 'from' attribute in any mail to be sent
const MAIL_FROM = '"SE Project - Support" <3anateelse@gmail.com>'
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: config.mailer
})


module.exports = {
  //Wrapper around transporter.sendMail to include the constant MAIL_FROM as well ass the transporter config above
  sendMail: function(mail, callback) {
    if (mail && mail.to && mail.subject && (mail.text || mail.html)) {
      //Prepare the mail object to be given to transporter.sendMail
      var mailOptions = {
        from: MAIL_FROM,
        to: mail.to,
        subject: mail.subject,
      }
      if (mail.html)
        mailOptions.html = mail.html
      else
        mailOptions.text = mail.text
      //Actually send the mail
      transporter.sendMail(mailOptions, callback)
    }
    else {
      callback(new Error('Invalid mail given'))
    }
  }
}
