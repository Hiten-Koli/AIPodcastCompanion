const multer = require('multer');
const path = require('path');
const { uploadAudio, transcribeAudio } = require('../services/transcriptionService');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Controller methods
exports.uploadAudio = (req, res) => {
    upload.single('audioFile')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'File upload failed.' });
        }
        res.status(200).json({ message: 'File uploaded successfully!', filePath: req.file.path });
    });
};

exports.transcribeAudio = async (req, res) => {
    try {
        const { filePath } = req.body; // File path from upload response
        const audioUrl = await uploadAudio(filePath);
        const transcript = await transcribeAudio(audioUrl);
        res.status(200).json({ transcript });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Transcription failed.' });
    }
};