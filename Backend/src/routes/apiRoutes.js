const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');
const summaryController = require('../controllers/summaryController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// File upload and transcribe route
router.post('/upload', upload.single('audioFile'), transcriptionController.uploadAndTranscribeAudio);

// Summary route
router.post('/summarize', summaryController.summarizeText);

module.exports = router;
