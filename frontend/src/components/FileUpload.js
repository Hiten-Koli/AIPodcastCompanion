import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onTranscriptionReceived }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('audioFile', selectedFile);

        try {
            setUploadStatus('Uploading & Transcribing...');
            const uploadResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData);
            onTranscriptionReceived(uploadResponse.data.transcript);
            setUploadStatus('Transcription completed!');
        } catch (error) {
            console.error(error);
            setUploadStatus('Error uploading or transcribing the file.');
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload Your Podcast</h2>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Transcribe</button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default FileUpload;
