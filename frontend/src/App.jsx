import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import Summarizer from './components/Summarizer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/summarizer" element={<Summarizer />} />
      </Routes>
    </Router>
  );
}

export default App;
