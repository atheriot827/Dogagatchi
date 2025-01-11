import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from './Context';
import Dog from './Dog';
import kennelBackground from './assets/kennel_scene/background.png';

function Kennel({ dogs, setDogs, coins, setCoins }) {
  const { user } = useAuth();
  const [currentDog, setCurrentDog] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [actionPosition, setActionPosition] = useState({ x: 0, y: 0 });
  const [dogPositions, setDogPositions] = useState({});

  // Style constants for positioning
  const KENNEL_POSITIONS = {
    sleepingArea: { x: 50, y: 150 },
    feedingArea: { x: 250, y: 300 },
    playArea: { x: 450, y: 200 },
    groomingArea: { x: 650, y: 250 },
  };

  // Filter dogs to only show owned dogs
  const ownedDogs = dogs.filter((dog) => dog.owner === user._id);

  // Initialize random positions for each dog
  useEffect(() => {
    const newPositions = {};
    ownedDogs.forEach((dog) => {
      if (dog._id !== currentDog?._id) {
        newPositions[dog._id] = {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          direction: 'right',
          action: 'Walking',
        };
      }
    });
    console.log('and me!');
    setDogPositions(newPositions);
  }, []); // [ownedDogs, currentDog];
  // Reason: Infinite render with those dependencies.
  // Temp Fix: Switched to using no dependencies
  // Positions will be placed once ?

  // Animation loop for background dogs
  useEffect(() => {
    //           switched to setTimeout
    //  const moveInterval = setinterval(() => {
    const moveInterval = setTimeout(() => {
      setDogPositions((prevPositions) => {
        const newPositions = { ...prevPositions };

        Object.keys(newPositions).forEach((dogId) => {
          if (dogId !== currentDog?._id) {
            const position = newPositions[dogId];
            const moveX = (Math.random() - 0.5) * 2;
            const moveY = (Math.random() - 0.5) * 2;

            position.x = Math.max(0, Math.min(90, position.x + moveX));
            position.y = Math.max(0, Math.min(90, position.y + moveY));
            position.direction = moveX > 0 ? 'right' : 'left';

            if (Math.random() < 0.01) {
              const actions = ['Walking', 'Standing', 'Sitting', 'Running'];
              position.action =
                actions[Math.floor(Math.random() * actions.length)];
            }
          }
        });
        return newPositions;
      });
    }, 100);

    // console.log('called me! {Kennel dog animation}');
    return () => clearInterval(moveInterval);
  }, [dogPositions]); /* was [currentDog] 
  currentDog was not triggering setTimeout to make a new position
  */

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
    axios
      .get(`/dog/users/${userObj._id}`)
      .then((response) => {
        setDogs(response.data.dogsArr);
      })
      .catch((err) => console.error('Error refreshing dogs:', err));
  };

  return (
    <div className='kennel-container'>
      {/* 8-bit background */}
      <div
        className='kennel-background'
        style={{
          backgroundImage: `url(${kennelBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background dogs */}
        {ownedDogs.map(
          (dog) =>
            dog._id !== currentDog?._id && (
              <div
                key={dog._id}
                className='background-dog'
                style={{
                  position: 'absolute',
                  left: `${dogPositions[dog._id]?.x ?? 0}%`,
                  top: `${dogPositions[dog._id]?.y ?? 0}%`,
                  transform: `scaleX(${
                    dogPositions[dog._id]?.direction === 'left' ? -1 : 1
                  })`,
                  transition: 'all 0.1s ease-in-out',
                  zIndex: 1,
                }}
              >
                <img
                  src={`/assets/gifs/${dog.breed}/${
                    dogPositions[dog._id]?.action ?? 'Standing'
                  }.gif`}
                  alt={dog.name}
                  style={{ width: '80px', height: '80px' }}
                />
                <div className='dog-name'>{dog.name}</div>
              </div>
            )
        )}

        {/* Interaction areas */}
        <div
          className='sleeping-area'
          onClick={() =>
            handleActionClick('sleep', KENNEL_POSITIONS.sleepingArea)
          }
        >
          <img src='/assets/kennel-items/dog-bed.png' alt='Dog Bed' />
        </div>

        <div
          className='feeding-area'
          onClick={() =>
            handleActionClick('feed', KENNEL_POSITIONS.feedingArea)
          }
        >
          <img src='/assets/kennel-items/food-bowl.png' alt='Food Bowl' />
        </div>

        <div
          className='play-area'
          onClick={() => handleActionClick('play', KENNEL_POSITIONS.playArea)}
        >
          <img src='/assets/kennel-items/toys.png' alt='Toys' />
        </div>

        <div
          className='grooming-area'
          onClick={() =>
            handleActionClick('groom', KENNEL_POSITIONS.groomingArea)
          }
        >
          <img src='/assets/kennel-items/brush.png' alt='Grooming Tools' />
        </div>

        {/* Current dog animation */}
        {currentDog && (
          <div
            className='current-dog'
            style={{
              left: actionPosition.x,
              top: actionPosition.y,
              transition: 'all 0.5s ease-in-out',
              zIndex: 2,
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
      <div className='kennel-controls'>
        <Row>
          <Col md={4}>
            <h3>Your Dogs</h3>
            <div className='dog-list'>
              {ownedDogs.map((dog) => (
                <Button
                  key={dog._id}
                  onClick={() => setCurrentDog(dog)}
                  variant={
                    currentDog && currentDog._id === dog._id
                      ? 'primary'
                      : 'outline-primary'
                  }
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
                isInKennel
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Kennel;
