const axios = require('axios');
const cloudinary = require('cloudinary').v2;

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Upload audio directly to Cloudinary
async function uploadAudioToCloudinary(file) {
  const fileName = `${Date.now()}-${file.originalname}`;
  
  // Upload file buffer to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', public_id: fileName },
      (error, result) => {
        if (error) {
          return reject(`Cloudinary upload failed: ${error.message}`);
        }
        resolve(result.public_id); // Return the public ID of the uploaded file
      }
    );
    uploadStream.end(file.buffer);
  });
}

// Generate a secure download URL for private file access
async function getCloudinaryFileUrl(fileKey) {
const { resources } = await cloudinary.search
    .expression(fileKey)
    .sort_by('public_id', 'desc')
    .max_results(1)
    .execute();

  if (resources.length === 0) {
    throw new Error('No matching file found in Cloudinary');
  }

  const publicId = resources[0].secure_url;
  console.log(publicId);
  return publicId; 
}

// Transcribe audio using AssemblyAI
async function transcribeAudio(audioUrl) {
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
        audio_url: audioUrl,
    }, {
        headers: { authorization: ASSEMBLYAI_API_KEY },
    });

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

module.exports = { uploadAudioToCloudinary, getCloudinaryFileUrl, transcribeAudio };
