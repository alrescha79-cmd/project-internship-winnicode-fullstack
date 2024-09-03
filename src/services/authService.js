const axios = require('axios');
require('dotenv').config();

const authService = {
    async login(email, password) {
        const response = await axios.post(process.env.URL_LOGIN, {
            email,
            password,
            returnSecureToken: true
        });
        return response.data;
    },

    async refreshAuthToken(refreshToken) {
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });
        return response.data;
    },

    async logout(idToken) {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${process.env.API_KEY}`, {
            idToken
        });
    }
};

module.exports = authService;
