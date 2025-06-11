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
      alert('📂 Please upload a PDF or TXT file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        'https://versemint-app.onrender.com/api/summarize-pdf',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true, // Important for CORS if backend enforces it
        }
      );

      setSummary(res.data.summary || '✅ Summary generated, but content was empty.');
    } catch (err) {
      console.error('❌ Error generating summary:', err);
      setSummary('⚠️ Error generating summary. Please try again.');
    }
  };

  return (
    <div className="summarizer-container">
      <h2 className="summarizer-title">Upload Document (PDF / TXT)</h2>

      <div className="file-input-wrapper">
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-upload" className="file-input-label">
          📁 Choose a file
        </label>
      </div>

      {file && <p className="selected-file">Selected File: {file.name}</p>}

      <button onClick={handleSummarize} className="generate-button">
        🚀 Generate Summary
      </button>

      <div className="summary-output">
        <h3 className="summary-title">Summary:</h3>
        <div className="summary-text">
          {summary || '📝 Your summary will appear here once generated.'}
        </div>
      </div>

      <footer className="footer">
        <p>Made with 💚 by Jesmin Mofi</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/jesmin-mofi-sunil-kumar-8473b82b8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/jesminmofi-cse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Summarizer;
