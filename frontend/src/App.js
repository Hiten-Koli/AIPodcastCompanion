import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Transcription from './components/Transcription';
import Summary from './components/Summary';
import './index.css';

const App = () => {
    const [transcript, setTranscript] = useState('');
    const [summary, setSummary] = useState('');

    const handleTranscriptionReceived = (transcriptText) => {
        setTranscript(transcriptText);
        setSummary(''); // Clear summary when a new transcription is received
    };

    const handleSummarizationRecieved = (text) => {
        setSummary(text); //Update summary
    };

    return (
        <div className="app">
            <h1>AI Podcast Companion</h1>
            <FileUpload onTranscriptionReceived={handleTranscriptionReceived} />
            <Transcription transcript={transcript} onSummaryRecieved={handleSummarizationRecieved} />
            <Summary summary={summary} />
        </div>
    );
};

export default App;
