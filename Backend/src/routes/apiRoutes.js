const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');
const summaryController = require('../controllers/summaryController');

// File upload route
router.post('/upload', transcriptionController.uploadAudio);

// Transcription route
router.post('/transcribe', transcriptionController.transcribeAudio);

// Summary route
router.post('/summarize', summaryController.summarizeText);

module.exports = router;
