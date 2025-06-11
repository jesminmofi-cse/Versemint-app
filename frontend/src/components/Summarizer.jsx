import { useState } from 'react';
import axios from 'axios';
import './Summarizer.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Summarizer = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSummarize = async () => {
    if (!file) {
      alert('Please upload a PDF or TXT file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/summarize-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setSummary('Error generating summary.');
    }
  };

  return (
    <div className="summarizer-container">
      <h2 className="summarizer-title">Upload Document (PDF / TXT)</h2>

      <div className="file-input-wrapper">
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.txt" // Match what backend supports!
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-upload" className="file-input-label">
          📁 Choose a file
        </label>
      </div>

      {file && <p className="selected-file">Selected File: {file.name}</p>}

      <button
        onClick={handleSummarize}
        className="generate-button"
      >
        Generate Summary
      </button>

      <div className="summary-output">
        <h3 className="summary-title">Summary:</h3>
        <div className="summary-text">
          {summary || 'Your summary will appear here.'}
        </div>
      </div>
      
    </div>
    
  );
};

export default Summarizer;
