const { summarizeText } = require('../services/summaryService');

exports.summarizeText = async (req, res) => {
    try {
        const { text } = req.body; // Transcription text
        const summary = await summarizeText(text);
        res.status(200).json({ summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Summarization failed.' });
    }
};
