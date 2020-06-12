const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'joelram1@hotmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'joelram1@hotmail.com',
        subject: 'Close account',
        text: `${name}. Let us know why you close your account`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}