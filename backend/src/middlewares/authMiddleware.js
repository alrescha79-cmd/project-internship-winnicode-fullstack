const { admin } = require('../config/Firebase');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'You are not authorized to access this resource',
            status: 401
        });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log('Error verifying token:', error);
        return res.status(401).json({
            message: 'You are not authorized to access this resource',
            status: 401
        });
    }
};

module.exports = authMiddleware;
