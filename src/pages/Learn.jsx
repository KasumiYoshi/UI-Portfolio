import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import chickadee1 from '../assets/BC1.png';
import chickadee2 from '../assets/BC2.png';
import cardinal1 from '../assets/Card1.png';
import cardinal2 from '../assets/Card2.png';
import robin1 from '../assets/Robin1.png';
import robin2 from '../assets/Robin2.png';
import chickadeeCall from '../assets/BlackcappedChickadee_spectrogram.wav';
import cardinalCall from '../assets/NorthernCardinal_spectrogram.wav';
import robinCall from '../assets/AmericanRobin_spectrogram.wav';
import lowImage from '../assets/Low.png';

function Learn() {
  console.log('Checking image imports:');
  console.log('Chickadee:', chickadee1);
  console.log('Cardinal:', cardinal1);
  console.log('Robin:', robin1);

  const birdProfiles = [
    {
      name: "Black-capped Chickadee",
      image: chickadee1,
      hoverImage: chickadee2,
      audio: chickadeeCall,
      facts: [
        "Has excellent spatial memory",
        "Can remember thousands of food storage locations",
        "Makes a distinctive 'chick-a-dee-dee' call",
        "Year-round resident on campus",
        "Forms winter flocks with other small birds"
      ],
      bgColor: "from-purple-100 to-purple-200"
    },
    {
      name: "Northern Cardinal",
      image: cardinal1,
      hoverImage: cardinal2,
      audio: cardinalCall,
      facts: [
        "Males are bright red, females are tan/brown",
        "Known for their distinctive whistling song",
        "Maintains territory year-round",
        "Forms long-term pair bonds",
        "Common at bird feeders"
      ],
      bgColor: "from-red-100 to-red-200"
    },
    {
      name: "American Robin",
      image: robin1,
      hoverImage: robin2,
      audio: robinCall,
      facts: [
        "Has a red-orange chest",
        "Often seen hunting worms on lawns",
        "One of the earliest morning singers",
        "Migrates in large flocks",
        "Symbol of spring's arrival"
      ],
      bgColor: "from-orange-100 to-orange-200"
    }
  ];

  const handleMouseOver = (audio, e) => {
    e.currentTarget.style.opacity = '1';
    const sound = new Audio(audio);
    sound.play();
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.opacity = '0';
  };

  return (
    <div className="learn-page">
      {/* Remove this section */}
      {/* <div style={{ margin: '10px' }}>
        <img src={chickadee1} alt="test chickadee" width="100" height="100" />
        <img src={cardinal1} alt="test cardinal" width="100" height="100" />
        <img src={robin1} alt="test robin" width="100" height="100" />
      </div> */}

      {birdProfiles.map((bird, index) => (
        <section
          key={bird.name}
          className={`min-h-screen bg-gradient-to-b ${bird.bgColor} flex items-center justify-center`}
        >
          <div className="w-full max-w-7xl mx-auto px-8 flex">
            {/* Left side - Blurb */}
            <div className="w-1/2 pr-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-sm bg-white/30 rounded-3xl p-8 shadow-xl"
              >
                <h2 className="text-4xl font-bold mb-6 text-center bird-name" style={{ padding: '2rem 0' }}>{bird.name}</h2>
                <div className="space-y-2" style={{ transform: 'translate(200px, 0)' }}>
                  <div 
                    className="bg-white/10 backdrop-blur-md p-10 shadow-lg border border-white/20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                      width: 'fit-content',
                      minWidth: '500px',
                      maxWidth: '800px',
                      borderRadius: '24px',
                      padding: '40px 32px 40px 48px',
                      transform: 'translate(0, 30px)'
                    }}
                  >
                    <h3 className="text-3xl font-semibold mb-8">Avian Profile</h3>
                    <div className="space-y-6 px-4">
                      {bird.facts.map((fact, i) => (
                        <p 
                          key={i} 
                          className="text-2xl flex items-start"
                        >
                          <span className="mr-4 text-3xl">•</span>
                          <span>{fact}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Image */}
            <div 
              className="w-1/2 pl-8 flex justify-center items-center" 
              style={{ transform: 'translate(1300px, -150px) scale(2)' }}
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src={bird.image}
                  alt={bird.name}
                  style={{ 
                    width: '150px',
                    height: '150px'
                  }}
                />
                <img
                  src={bird.hoverImage}
                  alt={bird.name}
                  style={{ 
                    width: '150px',
                    height: '150px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                  onMouseOver={(e) => handleMouseOver(bird.audio, e)}
                  onMouseOut={handleMouseOut}
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
          Click on Low Library to quiz yourself!
        </p>
        <Link 
          to="/quiz" 
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        >
          <img 
            src={lowImage}
            alt="Low Library" 
            style={{ 
              maxWidth: '500px',
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Link>
      </div>
    </div>
  );
}

export default Learn;