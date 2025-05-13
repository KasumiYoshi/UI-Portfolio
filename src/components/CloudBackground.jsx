import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './CloudBackground.css';

function CloudBackground() {
  console.log('CloudBackground component rendering');
  const [clouds, setClouds] = useState([]);
  const maxClouds = 20;
  const lastSpawnTime = useRef(0);
  const spawnInterval = useRef(null);

  const availablePositions = useRef([
    { y: '30%', available: true, lastUsed: 0 },
    { y: '40%', available: true, lastUsed: 0 },
    { y: '50%', available: true, lastUsed: 0 },
    { y: '65%', available: true, lastUsed: 0 },
    { y: '75%', available: true, lastUsed: 0 },
    { y: '90%', available: true, lastUsed: 0 }
  ]);

  // Function to get random delay between min and max
  const getRandomDelay = (min, max) => Math.random() * (max - min) + min;
  
  // Function to get random duration
  const getRandomDuration = () => getRandomDelay(45, 55);

  // Function to get next available position
  const getNextPosition = () => {
    const now = Date.now();
    const minTimeBetweenUses = 5000; // Reduced from 15000 to 5000 ms
    
    // Filter positions that haven't been used recently
    const availablePos = availablePositions.current.filter(
      pos => pos.available || (now - pos.lastUsed > minTimeBetweenUses)
    );

    if (availablePos.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * availablePos.length);
    const selectedPos = availablePos[randomIndex];
    
    // Mark position as used
    const posIndex = availablePositions.current.findIndex(pos => pos.y === selectedPos.y);
    availablePositions.current[posIndex].available = false;
    availablePositions.current[posIndex].lastUsed = now;
    
    return selectedPos.y;
  };

  // Function to create a new cloud
  const createCloud = () => {
    const yPosition = getNextPosition();
    if (!yPosition) return null; // No suitable position available

    return {
      id: Date.now(),
      type: Math.floor(Math.random() * 5) + 1,
      duration: getRandomDuration(),
      yPosition,
      active: true
    };
  };

  // Function to manage cloud lifecycle
  const spawnNewCloud = () => {
    const now = Date.now();
    const minTimeBetweenSpawns = 2000; // Reduced from 4000 to 2000 ms

    if (now - lastSpawnTime.current < minTimeBetweenSpawns) {
      return;
    }

    const newCloud = createCloud();
    if (newCloud) {
      lastSpawnTime.current = now;
      setClouds(prevClouds => {
        const activeClouds = prevClouds.filter(cloud => cloud.active);
        if (activeClouds.length >= maxClouds) {
          return [...prevClouds];
        }
        return [...prevClouds, newCloud];
      });
    }
  };

  useEffect(() => {
    // Initial spawn with a short delay
    const initialDelay = setTimeout(() => {
      spawnNewCloud();
      // Set up recurring spawn attempts
      spawnInterval.current = setInterval(() => {
        spawnNewCloud();
      }, getRandomDelay(3000, 6000)); // Try to spawn every 3-6 seconds
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      if (spawnInterval.current) {
        clearInterval(spawnInterval.current);
      }
    };
  }, []);

  // Remove clouds that have completed their animation
  const handleAnimationComplete = (cloudId, yPosition) => {
    setClouds(prevClouds => prevClouds.filter(cloud => cloud.id !== cloudId));
    
    // Mark the position as available again
    const posIndex = availablePositions.current.findIndex(pos => pos.y === yPosition);
    if (posIndex !== -1) {
      availablePositions.current[posIndex].available = true;
    }
  };

  return (
    <div className="cloud-container">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`cloud cloud${cloud.type}`}
          initial={{ x: "-200px", opacity: 0 }}
          animate={{
            x: "calc(100vw + 200px)",
            opacity: [0, 1, 1, 0]
          }}
          style={{ top: cloud.yPosition }}
          transition={{
            duration: cloud.duration,
            ease: "linear",
            times: [0, 0.1, 0.9, 1]
          }}
          onAnimationComplete={() => handleAnimationComplete(cloud.id, cloud.yPosition)}
        />
      ))}
    </div>
  );
}

export default CloudBackground; 