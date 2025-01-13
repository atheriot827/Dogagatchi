const express = require('express');

const router = express.Router();
const { Dog, User } = require('../db/index');

router.post('/exit', (req, res) => {
  const { dog, user } = req.body;
  // Give user some coins
  User.findByIdAndUpdate(user._id, { $inc: { coinCount: 3 } }, { new: true })
    .then((asd) => {
      console.log('success update to money', asd);
    })
    .catch((err) => {
      console.log(err, 'failed to update coin');
    });
  // Update dog stats
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { vitality: 5, discipline: 1, exp: 25 } },
    { new: true }
  )
    .then((walkedDog) => {
      // Update dog level AFTER stats change
      Dog.findOneAndUpdate(
        {
          owner: user._id,
          name: dog.name,
          exp: { $gte: 100 },
        },
        {
          exp: 0,
          $inc: { lvl: 1 },
        }
      )
        .then(() => console.log('updated level'))
        .catch((err) => console.log('no dog found', err));
      console.log(walkedDog);
      res.redirect('/home');
    })
    .catch((error) => {
      console.error(error, 'error exiting map');
      res.sendStatus(500);
    });
});

router.post('/weapon', (req, res) => {
  const { dog, user } = req.body;
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { attackDmg: 15, exp: 30 } },
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
  const { dog, user } = req.body;
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { health: 10, vitality: 5, exp: 10 } },
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
    // Update dog stats and exp
    const updatedDog = await Dog.findByIdAndUpdate(
      dogId,
      {
        $inc: {
          health: Math.min(100, healthRemaining), // Cap health at 100
          attackDmg: 1, // Slight attack increase after victory
          vitality: 10,
          experience: rewards.experience, // Add experience from battle
          walksTaken: 1, // Increment walks taken
        },
      },
      { new: true }
    );

    // Calculate new level based on experience
    const newLevel = Math.floor(updatedDog.experience / 100) + 1;

    // If level changed, update it
    if (newLevel !== updatedDog.level) {
      updatedDog.level = newLevel;
      await updatedDog.save();
    }

    // Update user coins
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          coinCount: rewards.coins,
        },
      },
      { new: true }
    );

    res.status(200).send({
      updatedDog,
      updatedUser,
      levelUp: newLevel !== updatedDog.level,
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
          health: 50, // Set health to 50% after defeat
        },
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
