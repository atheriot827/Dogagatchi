import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';

function Quiz({ onCoinsEarned }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);

// Fetch new question
const fetchNewQuestion = async () => {
  setLoading(true);
  try {
    // Get random dog image
    const { data: dogImages } = await axios.get('/api/quiz');
    const correctAnswer = dogImages[0].split('/')[4]; // Extract breed from URL

    // Create options array with correct answer and 3 random incorrect ones
    const allBreeds = await axios.get('https://dog.ceo/api/breeds/list/all');
    const breeds = Object.keys(allBreeds.data.message)
      .filter(breed => breed !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    breeds.push(correctAnswer);

    setCurrentQuestion({
      image: dogImages[0],
      correctAnswer
    });

    // Shuffle options
    setOptions(breeds.sort(() => 0.5 - Math.random()));
    setLoading(false);
    setShowResult(false);
  } catch (error) {
    console.error('Error fetching question:', error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchNewQuestion();
}, []);

const handleAnswer = async (selectedAnswer) => {
  const correct = selectedAnswer === currentQuestion.correctAnswer;
  setIsCorrect(correct);
  setShowResult(true);

  if (correct) {
    const newStreak = streak + 1;
    setStreak(newStreak);

    // Calculate coins earned (base + streak bonus)
    const baseCoins = 1;
    const streakBonus = Math.floor(newStreak / 3); // Bonus coin every 3 correct answers
    const coinsToAdd = baseCoins + streakBonus;

    setCoinsEarned(prev => prev + coinsToAdd);

    // Update user's coins in database
    try {
      await axios.put('/api/users/coins', {
        coinsToAdd
      });
      onCoinsEarned(coinsToAdd);
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  } else {
    setStreak(0);
  }

  // Wait 2 seconds before showing next question
  setTimeout(() => {
    fetchNewQuestion();
  }, 2000);
};

return (
  <Container className="quiz-container">
    <Card className="quiz-card">
      <Card.Header>
        <h2>Quiz</h2>
        <div className="quiz-stats">
          <p>Current Streak: {streak}</p>
          <p>Coins Earned: {coinsEarned}</p>
        </div>
        <ProgressBar
          variant="success"
          now={(streak % 3) * 33.33}
          label={`${3 - (streak % 3)} more for bonus coin!`}
        />
      </Card.Header>

      {loading ? (
        <Card.Body>
          <div className="text-center">Loading next question...</div>
        </Card.Body>
      ) : (
        <Card.Body>
          <div className="question-image">
            <img
              src={currentQuestion.image}
              alt="Mystery Dog"
              className="img-fluid"
            />
          </div>

          <div className="question-text">
            <h4>What breed is this dog?</h4>
          </div>

          <div className="options-grid">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline-primary"
                className="option-button"
                onClick={() => handleAnswer(option)}
                disabled={showResult}
              >
                {option.split('_').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Button>
            ))}
          </div>

          {showResult && (
            <Alert
              variant={isCorrect ? 'success' : 'danger'}
              className="mt-3"
            >
              {isCorrect
                ? `Correct! You earned ${1 + Math.floor(streak / 3)} coins!`
                : `Incorrect! The correct answer was ${currentQuestion.correctAnswer
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}`
              }
            </Alert>
          )}
        </Card.Body>
      )}
    </Card>
  </Container>
);
}

export default Quiz;
