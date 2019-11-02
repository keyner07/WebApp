const nodemailer = require('nodemailer');
const emailEnv = require('./EmailEnv');

var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: emailEnv.user,
        pass: emailEnv.user
    }
});
function sendMail(ToEmail){
    return new Promise((resolve, reject) => {
        var mailOption = {
            from: 'skerling19@hotmail.com',
            to: ToEmail,
            subject: 'Te toca llamar y pedir la orden',
            text: `Buenas, tienes que llamar a la heladeria y pedir la orden.
                    Heladeria Rantic. Tel:809-876-1234`
        };
        transporter.sendMail(mailOption, function(error, info){
                if(error){
                    console.error(error);
                    reject();
                }
                else{
                    console.log(`Email sent: ${info.response}`);
                    resolve();
                }
        })
    
    })
}
module.exports = {
    sendMail
}