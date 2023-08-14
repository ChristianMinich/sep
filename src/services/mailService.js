const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email',
        pass: 'password'
    }
});

const mailOptions = {
    from: 'email',
    to: 'email',
    subject: 'hello there',
    text: '<h1>hello there</h1>'
};

function sendMail(mailOptions) {
    return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };