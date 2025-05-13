import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollBackground.css';

function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress (0-1) into color stops
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#75aadb", // Dark blue at start
      "#75aadb", // Sky blue
      "#cdbdff",
      "#e6b3cc", // Orange
      "#bdcdff", // Lighter orange
      // Same lighter orange at end
    ]
  );

  return (
    <motion.div 
      className="scroll-background"
      style={{ backgroundColor }}
    />
  );
}

export default ScrollBackground; 