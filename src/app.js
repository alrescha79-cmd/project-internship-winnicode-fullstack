const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const journalistRoutes = require('./routes/journalistRoutes');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(errorHandler);

app.use('/news', newsRoutes);
app.use('/auth', authRoutes);
app.use('/journalist', journalistRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;