var config = require('../config/auth.js')
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  user: config.mailer.user,
  pass: config.mailer.pass
})

module.exports = function(mail, callback) {
  
}
