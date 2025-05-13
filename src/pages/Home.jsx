import BirdQuiz from '../components/BirdQuiz';
import { Link } from 'react-router-dom';
import almaImage from '../assets/Alma.png';

function Home() {
  return (
    <main className="main-content">
      {/* Hero Section */}
      
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ padding: '20px', fontSize: '2.5rem' }}>Welcome!</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>Through this webpage you will learn interesting facts about birds on Columbia University's campus. Feel free to click on Alma to learn more!</p>
        <Link to="/learn">
          <img 
            src={almaImage}
            alt="Alma" 
            style={{ 
              maxWidth: '500px', 
              marginTop: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Link>
      </div>

    </main>
  );
}

export default Home; 