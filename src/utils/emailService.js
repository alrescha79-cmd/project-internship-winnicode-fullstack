const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0928de58b5015c",
        pass: "df2f9faa99ed89"
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: '"Admin" <no-reply@winnicode.com>', // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
        html // HTML body
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;