const express = require('express');

const router = express.Router();
const { Dog, User } = require('../db/index');

router.post('/exit', (req, res) => {
  console.log('post to the exit test');
  const { dog, user } = req.body.walkerInfo;
  User.findByIdAndUpdate(user._id, { $inc: { coinCount: 3 } }, { new: true })
    .then((asd) => {
      console.log('success update to money', asd);
    })
    .catch((err) => {
      console.log(err, 'failed to update coin');
    });
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { health: 10, vitality: 25, speed: 1 } },
    { new: true }
  )
    .then((walkedDog) => {
      console.log(walkedDog);
      res.redirect('/home');
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

// Handle battle victory
router.post('/battle-victory', async (req, res) => {
  const { dogId, userId, rewards, healthRemaining } = req.body;

  try {
    // Update dog stats
    const updatedDog = await Dog.findByIdAndUpdate(
      dogId,
      {
        $inc: {
          health: Math.min(100, healthRemaining), // Cap health at 100
          attackDmg: 1, // Slight attack increase after victory
          vitality: 10
        }
      },
      { new: true }
    );

    // Update user coins
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          coinCount: rewards.coins
        }
      },
      { new: true }
    );

    res.status(200).send({
      updatedDog,
      updatedUser
    });
  } catch (error) {
    console.error('Error processing battle victory', error);
    res.sendStatus(500);
  }
});

// Handle battle defeat
router.post('/battle-defeat', async (req, res) => {
  const { dogId, userId } = req.body;

  try {
    // Update dog stats after defeat
    const updatedDog = await Dog.findByIdAndUpdate(
      dogId,
      {
        $set: {
          health: 50  // Set health to 50% after defeat
        }
      },
      { new: true }
    );

    res.status(200).send({ updatedDog });
  } catch (error) {
    console.error('Error processing battle defeat:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
