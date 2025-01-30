import React, { useState } from 'react';
import axios from 'axios';

const Transcription = ({ transcript, onSummaryRecieved }) => {
    const [summaryStatus, setSummaryStatus] = useState('');

    const handleSummarize = async (text) => {
            try {
                setSummaryStatus(`Summarizing...`)
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/summarize`, { text });
                onSummaryRecieved(response.data.summary);
                setSummaryStatus(`Summarized!!`)
            } catch (error) {
                console.error('Error summarizing text:', error);
                setSummaryStatus(`Error Summarizing the transcript!!`)
            }
        };

    return (
        <div className="transcription">
            <h2>Transcription</h2>
            <br/>
            <p>{transcript || 'No transcription available yet.'}</p>
            {transcript && <button onClick={() => handleSummarize(transcript)}>Summarize</button>}
            <p>{summaryStatus}</p>
        </div>
    );
};

export default Transcription;
