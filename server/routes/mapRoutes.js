const express = require('express');
const router = express.Router();
const { Dog, User } = require('../db/index');

router.post('/exit', (req, res) => {
  console.log('post to the exit test');
  // console.log(req.body);
  const { dog, user } = req.body.walkerInfo;
  console.log(user, 'the user');
  console.log(dog, 'the dog');
  Dog.findOneAndUpdate(
    { owner: user._id, name: dog.name },
    { $inc: { health: 10, vitality: 25, speed: 1 } },
    { new: true }
  )
    .then((walkedDog) => {
      console.log('success!');
      console.log(walkedDog);
      res.redirect('/user');
    })
    .catch((error) => {
      console.error(error, 'error exiting map');
    });
  //     User.findById(userId).then(({breeds}) => {
  //         res.status(200).send({dogsArr, breeds});
  //     }).catch((err) => {
  //         console.error('SERVER ERROR: failed to GET user breeds list by id', err);
  //         res.sendStatus(500);
  //     });
  // }).catch((err) => {
  //     console.error('SERVER ERROR: failed to GET dog by userId', err);
  //     res.sendStatus(500);
  // });
});

module.exports = router;
