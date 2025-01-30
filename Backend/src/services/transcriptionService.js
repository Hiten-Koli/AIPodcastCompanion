const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Upload audio to AssemblyAI
async function uploadAudio(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('https://api.assemblyai.com/v2/upload', formData, {
        headers: {
            authorization: ASSEMBLYAI_API_KEY,
            ...formData.getHeaders(),
        },
    });

    return response.data.upload_url;
}

// Transcribe audio using AssemblyAI
async function transcribeAudio(audioUrl) {
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
        audio_url: audioUrl,
    }, {
        headers: { authorization: ASSEMBLYAI_API_KEY },
    });

    // Poll for completion
    const transcriptId = response.data.id;
    while (true) {
        const statusResponse = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
            headers: { authorization: ASSEMBLYAI_API_KEY },
        });

        if (statusResponse.data.status === 'completed') {
            return statusResponse.data.text;
        } else if (statusResponse.data.status === 'failed') {
            throw new Error('Transcription failed');
        }
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
    }
}

module.exports = { uploadAudio, transcribeAudio };
