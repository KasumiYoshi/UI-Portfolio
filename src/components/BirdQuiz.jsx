import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import bird images with correct filenames
import chickadee1 from '../assets/BC1.png';
import cardinal1 from '../assets/Card1.png';
import robin1 from '../assets/Robin1.png';

const questions = [
  {
    question: "Which bird has a bright red male and a tan female?",
    options: ["Robin", "Chickadee", "Cardinal"],
    correctAnswer: 2,
    type: "multiple"
  },
  {
    question: "Which bird is most likely to be heard singing early in the morning on campus lawns?",
    options: ["Chickadee", "Robin", "Cardinal"],
    correctAnswer: 1,
    type: "multiple"
  },
  {
    question: "Which bird is known for hiding food in many places?",
    options: ["Cardinal", "Chickadee", "Robin"],
    correctAnswer: 1,
    type: "multiple"
  },
  {
    question: "The black-capped chickadee has a red chest.",
    options: ["True", "False"],
    correctAnswer: 1,
    type: "boolean"
  },
  {
    question: "Cardinals stay on Columbia's campus all year round.",
    options: ["True", "False"],
    correctAnswer: 0,
    type: "boolean"
  }
];

const matchingQuestions = [
  {
    bird: "Black-capped Chickadee",
    trait: "Hides food and remembers it",
    image: chickadee1,
    options: [
      "Hides food and remembers it",
      "Bright red male, whistling song",
      "Red-orange chest, hunts worms on lawns"
    ]
  },
  {
    bird: "Northern Cardinal",
    trait: "Bright red male, whistling song",
    image: cardinal1,
    options: [
      "Hides food and remembers it",
      "Bright red male, whistling song",
      "Red-orange chest, hunts worms on lawns"
    ]
  },
  {
    bird: "American Robin",
    trait: "Red-orange chest, hunts worms on lawns",
    image: robin1,
    options: [
      "Hides food and remembers it",
      "Bright red male, whistling song",
      "Red-orange chest, hunts worms on lawns"
    ]
  }
];

function BirdQuiz() {
  const [quizPhase, setQuizPhase] = useState('multipleChoice'); // 'multipleChoice', 'matching', 'complete'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [matchingQuestion, setMatchingQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [matchingScore, setMatchingScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    console.log('Multiple choice answer clicked:', answerIndex);
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        console.log('Starting matching phase');
        setQuizPhase('matching');
        setSelectedAnswer(null);
        setIsCorrect(null);
        setMatchingQuestion(0);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleMatchingAnswer = (selectedTrait) => {
    // Don't allow multiple clicks while processing an answer
    if (selectedAnswer !== null) return;

    console.log('Matching answer clicked:', selectedTrait);
    console.log('Current matching question:', matchingQuestions[matchingQuestion]);
    console.log('Current trait:', matchingQuestions[matchingQuestion].trait);
    
    const correct = selectedTrait === matchingQuestions[matchingQuestion].trait;
    console.log('Is answer correct?', correct);
    
    setIsCorrect(correct);
    setSelectedAnswer(selectedTrait);
    
    if (correct) {
      setMatchingScore(prevScore => prevScore + 1);
      console.log('Updated matching score:', matchingScore + 1);
    }

    setTimeout(() => {
      if (matchingQuestion < matchingQuestions.length - 1) {
        console.log('Moving to next matching question');
        setMatchingQuestion(prevQuestion => prevQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        console.log('Completing quiz');
        setQuizPhase('complete');
      }
    }, 1500);
  };

  const renderMatchingQuestion = () => (
    <motion.div
      key="matching"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/25 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Matching Question {matchingQuestion + 1} of {matchingQuestions.length}
          </span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <div
            className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((matchingQuestion + 1) / matchingQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Match the trait to: {matchingQuestions[matchingQuestion].bird}
        </h2>
        <motion.img
          src={matchingQuestions[matchingQuestion].image}
          alt={matchingQuestions[matchingQuestion].bird}
          className="rounded-lg shadow-lg mb-6 bg-white/50 p-4"
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-4">
        {matchingQuestions[matchingQuestion].options.map((trait, index) => (
          <motion.button
            key={index}
            onClick={() => handleMatchingAnswer(trait)}
            className="w-full p-4 text-left rounded-xl transition-all cursor-pointer bg-white/50 hover:bg-white/70 border border-white/50"
            style={{
              backgroundColor: selectedAnswer === trait
                ? trait === matchingQuestions[matchingQuestion].trait
                  ? 'rgba(76, 175, 80, 0.2)'
                  : 'rgba(239, 83, 80, 0.2)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: selectedAnswer === trait
                ? trait === matchingQuestions[matchingQuestion].trait
                  ? '#4caf50'
                  : '#ef5350'
                : 'rgba(255, 255, 255, 0.5)',
              color: selectedAnswer === trait
                ? trait === matchingQuestions[matchingQuestion].trait
                  ? '#2e7d32'
                  : '#c62828'
                : '#333333'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {trait}
          </motion.button>
        ))}
      </div>

      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            isCorrect ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
          }`}
        >
          {isCorrect ? 'Correct!' : 'Incorrect. Try again next time!'}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {quizPhase === 'complete' ? (
            <motion.div
              key="final-score"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/25 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center border border-white/30"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">All Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Multiple Choice Score: {score} out of {questions.length}<br/>
                Matching Score: {matchingScore} out of {matchingQuestions.length}
              </p>
              <motion.button
                onClick={() => {
                  setQuizPhase('multipleChoice');
                  resetQuiz();
                  setMatchingQuestion(0);
                  setMatchingScore(0);
                }}
                style={{
                  backgroundColor: '#FFD700',
                  opacity: 0.5
                }}
                className="w-full p-4 text-center rounded-xl transition-all cursor-pointer hover:bg-[#FFD700]/70 border border-[#FFD700]/50 text-gray-800 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : quizPhase === 'matching' ? (
            renderMatchingQuestion()
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/25 backdrop-blur-lg rounded-2xl shadow-xl p-12 border border-white/30"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {questions[currentQuestion].type === "boolean" ? "True/False" : "Multiple Choice"}
                  </span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div
                    className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-8 my-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className="w-full p-6 text-center rounded-xl transition-all cursor-pointer bg-white/50 hover:bg-white/70 border border-white/50"
                    style={{
                      backgroundColor: selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'rgba(76, 175, 80, 0.2)'
                          : 'rgba(239, 83, 80, 0.2)'
                        : 'rgba(255, 255, 255, 0.5)',
                      borderColor: selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? '#4caf50'
                          : '#ef5350'
                        : 'rgba(255, 255, 255, 0.5)',
                      color: selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? '#2e7d32'
                          : '#c62828'
                        : '#333333',
                      marginBottom: '1.5rem'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    isCorrect ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect. Try again next time!'}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BirdQuiz;