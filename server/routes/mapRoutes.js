const express = require('express');
const router = express.Router();
const { Dog, User } = require('../db/index');

router.post('/exit', (req, res) => {
  console.log('post to the exit test');
  const { dog, user } = req.body.walkerInfo;
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { health: 10, vitality: 25, speed: 1 } },
    { new: true }
  )
    .then((walkedDog) => {
      console.log(walkedDog);
      res.redirect('/user');
    })
    .catch((error) => {
      console.error(error, 'error exiting map');
      res.sendStatus(500);
    });
});

router.post('/weapon', (req, res) => {
  console.log('post to the weapon test');
  const { dog, user } = req.body.walkerInfo;
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { attackDmg: 15 } },
    { new: true }
  )
    .then((walkedDog) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error, 'error grabbing weapon');
      res.sendStatus(500);
    });
});

router.post('/item', (req, res) => {
  console.log('post to the item test');
  const { dog, user } = req.body.walkerInfo;
  console.log(user, 'the user');
  console.log(dog, 'the dog');
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { health: 10, vitality: 5 } },
    { new: true }
  )
    .then((walkedDog) => {
      console.log(walkedDog);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error, 'error exiting map');
      res.sendStatus(500);
    });
});

module.exports = router;
