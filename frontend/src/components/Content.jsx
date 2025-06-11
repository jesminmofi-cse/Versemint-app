import { useNavigate } from 'react-router-dom';
import './Content.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Content = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/summarizer');
  };

  return (
    <>
      <div className="content-container">
        <h2 className="content-title">Less blah. More aha!</h2>
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </div>

      {/* Footer inside Content.jsx */}
      <footer className="footer">
        <div className="footer-icons">
          <a
            href="https://www.linkedin.com/in/jesmin-mofi-sunil-kumar-8473b82b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/jesminmofi-cse"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <div className="footer-text">
          © {new Date().getFullYear()} ThinkSnap — Built with ❤️ for better learning
        </div>
      </footer>
    </>
  );
};

export default Content;
