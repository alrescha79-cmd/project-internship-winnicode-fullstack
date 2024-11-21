const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //     user: "0928de58b5015c",
    //     pass: "df2f9faa99ed89"
    // }
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD 
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: '"Admin Winnicode" <25alrescha@gmail.com>',
        to,
        subject,
        text,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;