const config = require('../../config/auth')
const MAIL_FROM = '"SE Project - Support" <3anateelse@gmail.com>'
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  user: config.mailer.user,
  pass: config.mailer.pass
})


module.exports = {
  sendMail: function(mail, callback) {
    if (mail && mail.to && mail.subject && (mail.text || mail.html)) {
      var mailOptions = {
        from: MAIL_FROM,
        to: mail.to,
        subject: mail.subject,
      }
      if (mail.html)
        mailOptions.html = mail.html
      else
        mailOptions.text = mail.text
      transporter.sendMail(mailOptions, callback)
    }
    else {
      callback(new Error('Invalid mail given'))
    }
  }
}
