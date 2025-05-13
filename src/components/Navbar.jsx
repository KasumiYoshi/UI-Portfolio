import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: 'rgba(255, 255, 255, 0.25)',  // transparent white
      backdropFilter: 'blur(10px)',                  // glass effect
      WebkitBackdropFilter: 'blur(10px)',           // for Safari support
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      position: 'relative',       // Changed to relative positioning
      marginTop: '20px',         // Reduced from 40px
      left: 'calc(50% + 100px)',  // Adjust this value based on logo width
      transform: 'translateX(-25%) translateY(-70px)', // Added translateY
      width: '60%',               // Reduced width since we're moving it right
      maxWidth: '800px',         // Maximum width
      borderRadius: '15px',       // Rounded corners
      zIndex: 1000,              // Ensure navbar stays on top
    }}>
      {/* Logo overlaid to the left */}
      <div style={{
        position: 'absolute',
        left: '20px',
        top: '10px',
        transform: 'translateY(10%)',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        zIndex: 2
      }}>
      </div>

      {/* Navigation links skewed right */}
      <ul style={{ 
        display: 'flex', 
        gap: '2rem', 
        listStyle: 'none',
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',  // Align items to the right
        paddingRight: '20px'         // Add some space from right edge
      }}>
        <li>
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/learn" className="nav-link">Learn</Link>
        </li>
        <li>
          <Link to="/quiz" className="nav-link">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 