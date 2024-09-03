const Journalist = require('../models/journalistModel');

exports.addJournalist = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: 'Password is too short, must be at least 6 characters.'
            });
        }

        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: 'Invalid phone number format. It should be in the format +1234567890.'
            });
        }

        const journalistId = await Journalist.createJournalist({ name, phone, email, password });

        res.status(201).json({
            message: 'Journalist successfully created and added to Firestore',
            journalistId
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
        const { name, phone, email } = req.body;

        await Journalist.updateJournalist(journalistId, { name, phone, email });

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
