import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';

function DogShop({ coins, setCoins }) {
  const [availableDogs, setAvailableDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const DOG_BREEDS = [
    'australian_shepherd',
    'bernese_mountain_dog',
    'bloodhound',
    'dalmation',
    'doberman',
    'german_shepherd',
    'great_dane',
    'greyhound',
    'leonberger',
    'shiba_inu',
    'siberian_husky'
  ];

  const DOG_PRICES = {
    'australian_shepherd': 50,
    'bernese_mountain_dog': 60,
    'bloodhound': 45,
    'dalmation': 55,
    'doberman': 65,
    'german_shepherd': 70,
    'great_dane': 80,
    'greyhound': 50,
    'leonberger': 75,
    'shiba_inu': 85,
    'siberian_husky': 90
  };

  useEffect(() => {
    // Load available dogs
    setAvailableDogs(DOG_BREEDS.map(breed => ({
      breed,
      price: DOG_PRICES[breed],
      animation: `/assets/gifs/${breed}/Standing.gif`
    })));
  }, []);

  const handlePurchase = (dog) => {
    if (coins >= dog.price) {
      const userObj = JSON.parse(sessionStorage.getItem('user'));

      // Create new dog in database
      axios.post('/api/dogs', {
        breed: dog.breed,
        name: `New ${dog.breed.split('_').map(w =>
          w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
        img: dog.animation,
        owner: userObj._id
      })
      .then((response) => {
        // Update dogs list
        setDogs(prev => [...prev, response.data]);

        // Update coins
        return axios.put(`/api/users/${userObj._id}/coins`, {
          coins: coins - dog.price
        });
      })
      .then(() => {
        setCoins(prev => prev - dog.price);
        setShowPurchaseModal(false);
        alert('Dog purchased successfully!');
      })
      .catch(err => {
        console.error('Error purchasing dog:', err);
        alert('Failed to purchase dog');
      });
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <Container className="dog-shop">
      <h2>Dog Shop</h2>
      <p>Your Coins: {coins}</p>

      <Row>
        {availableDogs.map(dog => (
          <Col key={dog.breed} xs={12} md={4} lg={3}>
            <Card className="mb-4">
              <div className="dog-preview">
                <img
                  src={dog.animation}
                  alt={dog.breed}
                  className="dog-animation"
                />
              </div>
              <Card.Body>
                <Card.Title>
                  {dog.breed.split('_').map(w =>
                    w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Card.Title>
                <Card.Text>Price: {dog.price} coins</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedDog(dog);
                    setShowPurchaseModal(true);
                  }}
                  disabled={coins < dog.price}
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showPurchaseModal} onHide={() => setShowPurchaseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDog && (
            <>
              <img
                src={selectedDog.animation}
                alt={selectedDog.breed}
                style={{ width: '200px', marginBottom: '20px' }}
              />
              <p>Are you sure you want to purchase this {
                selectedDog.breed.split('_').map(w =>
                  w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              } for {selectedDog.price} coins?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPurchaseModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handlePurchase(selectedDog)}
          >
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DogShop;