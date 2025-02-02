const { uploadAudioToCloudinary, getCloudinaryFileUrl, transcribeAudio } = require('../services/transcriptionService');

exports.uploadAndTranscribeAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Upload the audio directly to Backblaze
        const fileKey = await uploadAudioToCloudinary(req.file);
        const secureFileUrl = await getCloudinaryFileUrl(fileKey);

        // Transcribe the audio from Backblaze using AssemblyAI
        const transcript = await transcribeAudio(secureFileUrl);
        res.status(200).json({ transcript });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the audio file.' });
    }
};
