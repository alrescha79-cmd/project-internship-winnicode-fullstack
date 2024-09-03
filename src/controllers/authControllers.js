const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await authService.login(email, password);

        res.status(200).json({
            message: 'Login success',
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn
        });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        if (error.response) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            next(error);
        }
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const data = await authService.refreshAuthToken(refreshToken);

        res.status(200).json({
            message: 'Token refreshed successfully',
            idToken: data.id_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
        });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to refresh token' });
    }
};

exports.logout = async (req, res) => {
    try {
        const { idToken } = req.body;

        await authService.logout(idToken);

        res.status(200).json({ message: 'Logout success' });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to logout' });
    }
};
