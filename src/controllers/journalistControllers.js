const Journalist = require('../models/journalistModel');
const sendEmail = require('../utils/emailService');

exports.addJournalist = async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: 'Invalid phone number format. It should be in the format +1234567890.'
            });
        }

        const journalistId = await Journalist.createJournalist({ name, phone, email });

        // Send welcome email
        const emailContent = {
            to: email,
            subject: 'Informasi Akun Penulis',
            text: `Hai ${name},\n\nIni adalah email konfirmasi bahwa Anda telah menjadi Penulis di Portal Berita Kami.`,
            html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Selamat</title>
                        <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                            margin: 0 auto;
                        }
                        h2,
                        h3,
                        h4,
                        h5,
                        p {
                            text-align: start;
                        }
                        .q {
                            margin-left: 1rem;
                            border : 1px solid #000;
                            padding : 1rem;
                            border-radius : 5px;
                            background: #f4f4f4;
                        }
                        </style>
                    </head>
                    <body>
                        <img
                        src="https://winnicode.com/mazer/images/nav-banner-logo.png"
                        alt="Winnicode Logo"
                        />
                        <h2>Hai ${name},</h2>
                        <p>
                        Ini adalah email konfirmasi bahwa Anda telah menjadi Penulis di Portal
                        Berita Kami.
                        </p>
                        <br />
                        <h3>Berikut merupakan informasi akun Anda:</h3>
                        <div class="q">
                        <p>Nama : ${name}</p>
                        <p>Nomor HP : ${phone}</p>
                        <p>Email : ${email}</p>
                        <p>Password : 12345678</p>
                        </div>

                        <h5>Gunakan Email dan Password untuk login ke admin portal</h5>

                        <h4 style="color: #ff0000">Ubah Password Anda setelah berhasil login</h4>

                        <p>Terima kasih</p>
                        <br />
                        <p>Admin Winnicode</p>
                    </body>
                    </html>`
        };
        await sendEmail(emailContent);

        res.status(201).json({
            message: 'Journalist successfully created and added to Firestore',
            name,
            phone,
            email,
            password: '12345678',
            tips: 'Please change the password after the first login'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to create new Journalist',
            error: error.message
        });
    }
};

exports.getJournalist = async (req, res) => {
    try {
        const journalists = await Journalist.getAllJournalists();
        res.status(200).json(journalists);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to get Journalist data',
            error: error.message
        });
    }
};

exports.getJournalistById = async (req, res) => {
    try {
        const journalistId = req.params.id;
        const journalist = await Journalist.getJournalistById(journalistId);
        res.status(200).json(journalist);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            message: error.message
        });
    }
};

exports.updateJournalist = async (req, res) => {
    try {
        const journalistId = req.params.id;
        const { name, phone, email, password } = req.body;
        const profilePicture = req.file;

        await Journalist.updateJournalist(journalistId, { name, phone, email, password, profilePicture });

        res.status(200).json({
            message: 'Journalist data updated successfully'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to update Journalist data',
            error: error.message
        });
    }
};

exports.deleteJournalist = async (req, res) => {
    try {
        const journalistId = req.params.id;

        await Journalist.deleteJournalist(journalistId);

        res.status(200).json({
            message: 'Journalist data deleted successfully'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to delete Journalist data',
            error: error.message
        });
    }
};
