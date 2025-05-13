import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedLogo from './components/AnimatedLogo';
import CloudBackground from './components/CloudBackground';
import ScrollBackground from './components/ScrollBackground';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '300vh',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}>
        <ScrollBackground />
        <CloudBackground />
        <AnimatedLogo />
        <Navbar />
        <div style={{ 
          padding: '20px',
          paddingTop: '100px',
          position: 'relative',
          zIndex: 1
        }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
