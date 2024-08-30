const { admin, db } = require('../config/Firebase');

exports.addJournalist = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: 'Password is too short, must be at least 6 characters.'
            });
        }

        // Validasi format nomor telepon
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: 'Invalid phone number format. It should be in the format +1234567890.'
            });
        }

        // Membuat pengguna di Firebase Authentication
        const journalistRecord = await admin.auth().createUser({
            email,
            password,
            phoneNumber: phone,
            displayName: name,
            emailVerified: false,
            disabled: false
        });

        await db.collection('journalist').doc(journalistRecord.uid).set({
            name,
            phone,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({
            message: 'Journalist successfully created and added to Firestore',
            journalistId: journalistRecord.uid
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to create new Journalist',
            error: error.message
        });
    }
};

exports.getJournalist = async (req, res) => {
    try {
        const journalistSnapshot = await db.collection('journalist').get();
        const journalists = [];
        journalistSnapshot.forEach(doc => {
            journalists.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(journalists);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to get Journalist data',
            error: error.message
        });
    }
}

exports.getJournalistById = async (req, res) => {
    try {
        const journalistId = req.params.id;
        const journalistDoc = await db.collection('journalist').doc(journalistId).get();
        if (!journalistDoc.exists) {
            return res.status(404).json({
                message: 'Journalist not found'
            });
        }

        res.status(200).json({
            id: journalistDoc.id,
            ...journalistDoc.data()
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to get Journalist data',
            error: error.message
        });
    }
}

exports.updateJournalist = async (req, res) => {
    try {
        const journalistId = req.params.id;
        const { name, phone, email } = req.body;

        const journalistDoc = db.collection('journalist').doc(journalistId);
        const journalist = await journalistDoc.get();
        if (!journalist.exists) {
            return res.status(404).json({
                message: 'Journalist not found'
            });
        }

        await journalistDoc.update({
            name,
            phone,
            email
        });

        res.status(200).json({
            message: 'Journalist data updated successfully'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Failed to update Journalist data',
            error: error.message
        });
    }
}

exports.deleteJournalist = async (req, res) => {
    try {
        const journalistId = req.params.id;
        const journalistDoc = db.collection('journalist').doc(journalistId);
        const journalist = await journalistDoc.get();
        if (!journalist.exists) {
            return res.status(404).json({
                message: 'Journalist not found'
            });
        }

        await admin.auth().deleteUser(journalistId);
        await journalistDoc.delete();

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
}

