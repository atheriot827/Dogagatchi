import React, { useState } from 'react';
import { Container, Tab, Tabs, Alert } from 'react-bootstrap';
import Quiz from './Quiz';
import DogShop from './DogShop';

function PoochCenter() {
    const [coins, setCoins] = useState(0);
    const [showEarnedAlert, setShowEarnedAlert] = useState(false);
    const [lastEarned, setLastEarned] = useState(0);

    const handleCoinsEarned = (amount) => {
      setCoins(prev => prev + amount);
      setLastEarned(amount);
      setShowEarnedAlert(true);
      setTimeout(() => setShowEarnedAlert(false), 3000);
    };

  return (
  <Container>
    {showEarnedAlert && (
        <Alert
          variant="success"
          className="coin-alert"
          onClose={() => setShowEarnedAlert(false)}
          dismissible
        >
          You earned {lastEarned} coins!
        </Alert>
      )}

      <Tabs
        defaultActiveKey="quiz"
        className="mb-3"
      >
        <Tab eventKey="quiz">
          <Quiz onCoinsEarned={handleCoinsEarned} />
        </Tab>
        <Tab eventKey="shop" title="Dog Shop">
          <DogShop coins={coins} setCoins={setCoins} />
        </Tab>
      </Tabs>
  </Container>
  );
};

export default PoochCenter;
