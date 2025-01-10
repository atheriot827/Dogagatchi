import React, { useState, useEffect } from 'react';
import { useAuth } from './Context.jsx';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Dog from './Dog.jsx';

function Kennel({ dogs, setDogs, coins, setCoins }) {
  const { user } = useAuth();
  const [currentDog, setCurrentDog] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [actionPosition, setActionPosition] = useState({ x: 0, y: 0 });

  // Style constants for positioning
  const KENNEL_POSITIONS = {
    sleepingArea: { x: 50, y: 150 },
    feedingArea: { x: 250, y: 300 },
    playArea: { x: 450, y: 200 },
    groomingArea: { x: 650, y: 250 }
  };

  // Filter dogs to only show owned dogs
  const ownedDogs = dogs.filter(dog => dog.owner === user._id);

  useEffect(() => {
    if (ownedDogs && ownedDogs.length > 0) {
      setCurrentDog(ownedDogs[0]);
    }
  }, [ownedDogs]);

  const handleActionClick = (action, position) => {
    setCurrentAction(action);
    setActionPosition(position);

    // Animation will play for 2 seconds
    setTimeout(() => {
      setCurrentAction(null);
    }, 2000);
  };

  // Add a refresh function to update dogs
  const refreshDogs = () => {
    const userObj = JSON.parse(sessionStorage.getItem('user'));
    axios.get(`/dog/users/${userObj._id}`)
      .then(response => {
        setDogs(response.data.dogsArr);
      })
      .catch(err => console.error('Error refreshing dogs:', err));
  };

  return (
    <div className="kennel-container">
      {/* 8-bit background */}
      <div className="kennel-background">
        {/* Interaction areas */}
        <div
          className="sleeping-area"
          onClick={() => handleActionClick('sleep', KENNEL_POSITIONS.sleepingArea)}
        >
          <img src="/assets/kennel-items/dog-bed.png" alt="Dog Bed" />
        </div>

        <div
          className="feeding-area"
          onClick={() => handleActionClick('feed', KENNEL_POSITIONS.feedingArea)}
        >
          <img src="/assets/kennel-items/food-bowl.png" alt="Food Bowl" />
        </div>

        <div
          className="play-area"
          onClick={() => handleActionClick('play', KENNEL_POSITIONS.playArea)}
        >
          <img src="/assets/kennel-items/toys.png" alt="Toys" />
        </div>

        <div
          className="grooming-area"
          onClick={() => handleActionClick('groom', KENNEL_POSITIONS.groomingArea)}
        >
          <img src="/assets/kennel-items/brush.png" alt="Grooming Tools" />
        </div>

        {/* Current dog animation */}
        {currentDog && (
          <div
            className="current-dog"
            style={{
              left: actionPosition.x,
              top: actionPosition.y,
              transition: 'all 0.5s ease-in-out'
            }}
          >
            <img
              src={`/assets/gifs/${currentDog.breed}/${
                currentAction ? `${currentAction}.gif` : 'Standing.gif'
              }`}
              alt={currentDog.name}
            />
          </div>
        )}
      </div>

      {/* Dog selection and stats */}
      <div className="kennel-controls">
        <Row>
          <Col md={4}>
            <h3>Your Dogs</h3>
            <div className="dog-list">
              {ownedDogs.map(dog => (
                <Button
                  key={dog._id}
                  onClick={() => setCurrentDog(dog)}
                  variant={currentDog && currentDog._id === dog._id ? 'primary' : 'outline-primary'}
                >
                  {dog.name}
                </Button>
              ))}
            </div>
          </Col>
          <Col md={8}>
            {currentDog && (
              <Dog
                dogObj={currentDog}
                coins={coins}
                setCoins={setCoins}
                isInKennel={true}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Kennel;