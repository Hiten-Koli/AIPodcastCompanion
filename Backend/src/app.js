const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

// Middleware
app.use(cors({ origin: 'https://aipodcastcompanion.netlify.app' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong! (Server Side)' });
});

module.exports = app;
