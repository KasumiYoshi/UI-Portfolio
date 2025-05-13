import { motion } from 'framer-motion';
import './AnimatedLogo.css';

function AnimatedLogo() {
  const text = "Bird's Eye View";
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: { 
      opacity: 1, 
      x: 0,
    }
  };

  return (
    <motion.div 
      className="logo-container"
      style={{
        position: 'static',
        left: '20px',
        top: '40px',
        transform: 'translateX(90px)',
        zIndex: 1001
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className="cursive-logo"
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedLogo; 