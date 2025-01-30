import React from 'react';

const Summary = ({ summary }) => {
    return (
        <div className="summary">
            <h2>Summary</h2>
            <br/>
            <p>{summary || 'No summary available yet.'}</p>
        </div>
    );
};

export default Summary;
