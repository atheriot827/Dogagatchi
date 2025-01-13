const express = require('express')
const router = express.Router()
const { User } = require('../db/index')

// **************** GET ROUTES ********************

//GET LEADERBOARD BY TYPE

router.get('/leaderboard/:type', (req, res) => {
    const filterUsers = (filterProp) => User.find({}, null).sort({ [filterProp]: -1 });
    const { type } = req.params;
    if (type === 'smartest') {
        filterUsers('questionCount')
            .then((users) => {
                if (users) {
                    res.status(200).send(users);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    } else if (type === 'richest') {
        filterUsers('coinCount')
            .then((users) => {
                if (users) {
                    res.status(200).send(users);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    }
});

//GET MEALS BY USER ID

router.get('/meals/:userId', (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((err) => console.error('meals put req server ERROR:', err))
})

router.get('/medicines/:userId', (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((err) => console.error('medicines put req server ERROR:', err))
})

//GET USER BY USER ID

router.get('/:userId', (req, res) => {
    const id = req.params.userId
    User.find({ _id: id })
        .then((user) => {
            if (user) {
                res.status(200).send(user)
            }
        })
})

// **************** PUT ROUTES ********************

//UPDATE ACHIEVEMENTS BY USER ID

router.put('/achievements/:userId', (req, res) => {
    //destructure params from req obj
    const { userId } = req.params;
    const newAchieve = req.body;
    //return the updated user
    User.findByIdAndUpdate(
        userId,
        { $push: { achievements: newAchieve } },
        { new: true },//sends back the updated user with new
    )
        .then((user) => {
            if (user) {
                res.status(200).send(user);
            } else { //else get back null
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to PUT user achievements', err);
            res.sendStatus(500);
        })
})

//UPDATE MEALS BY USER ID

router.put('/meals/:userId', (req, res) => {
    const { userId } = req.params;
    const { coinCount, meals, update, mealToDelete } = req.body

    if (update.type === 'buyMeal') {
        User.findByIdAndUpdate(userId, {
            $set: { coinCount: coinCount.newCount },
            $push: { meals: meals.meal }
        }, { returnDocument: 'after' })
            .then((updatedUser) => {
                updatedUser ? res.status(200).send(updatedUser) : res.sendStatus(404)
            })
            .catch((err) => console.error('meals put req server ERROR:', err))
    } else if (update.type === 'deleteMeal') {
        User.findByIdAndUpdate(userId, {
            $pull: { meals: mealToDelete }
        })
            .then((updatedDoc) => res.status(200).send(updatedDoc))
            .catch((err) => console.error('could not delete meal', err))
    }

})


router.put('/medicines/:userId', (req, res) => {
    const { userId } = req.params;
    const { coinCount, medicines, update, medicineToDelete } = req.body

    if (update.type === 'buyMedicine') {
        User.findByIdAndUpdate(userId, {
            $set: { coinCount: coinCount.newCount },
            $push: { medicines: medicines.medicine }
        }, { returnDocument: 'after' })
            .then((updatedUser) => {
                updatedUser ? res.status(200).send(updatedUser) : res.sendStatus(404)
            })
            .catch((err) => console.error('medicines put req server ERROR:', err))
    } else if (update.type === 'deleteMedicine') {
        User.findByIdAndUpdate(userId, {
            $pull: { medicines: medicineToDelete }
        })
            .then((updatedDoc) => res.status(200).send(updatedDoc))
            .catch((err) => console.error('could not delete medicine', err))
    }

})

// PUT ACTIVITIES BY USER ID
// saving an activity OR deleting an activity
router.put("/activities/:userId", (req, res) => {
    const { userId } = req.params;
    const { activityUpdate, newActivity } = req.body; 
    if (activityUpdate === "addActivity") {
      User.findByIdAndUpdate(userId, {
        $push: { activities: newActivity },
      })
        .then((oldObj) => {
          if (oldObj) {
            // find + send the updated user
            User.findById(userId)
              .then((updatedUser) => {
                res.status(200).send(updatedUser);
              })
              .catch((err) => {
                res.sendStatus(500);
              });
          } else {
            res.sendStatus(404);
          }
        })
        .catch((err) => res.sendStatus(500));
    } else if (activityUpdate === "deleteActivity") {
      User.findByIdAndUpdate(userId, {
        $pull: { activities: newActivity },
      })
        .then((oldObj) => {
          if (oldObj) {
            User.findById(userId)
              .then((updatedUser) => {
                res.status(200).send(updatedUser);
              })
              .catch((err) => {
                res.sendStatus(500);
              });
          } else {
            res.sendStatus(404);
          }
        })
        .catch((err) => res.sendStatus(500));
    }
  });


// UPDATE COINS BY ID
router.put('/coins/:userId', (req, res) => {
    const { userId } = req.params;
    const {coinCount} = req.body;
    // const { coinCount } = req.body;

    User.findByIdAndUpdate(userId, {
        $inc: {coinCount: coinCount}
    }, { returnDocument: 'after'})
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).send(updatedUser)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => res.sendStatus(500))
});

//UPDATE USER BY USER ID

router.put('/:_id', (req, res) => {
    const { _id } = req.params;
    const { url } = req.body.dog;
    User.findByIdAndUpdate(
        { _id },
        { $inc: { questionCount: 1, coinCount: 1, dogCount: 1 }, $push: { breeds: url } },
        { new: true },
    )
        .then((user) => {
            if (!user) {
                res.sendStatus(404);
            } else {
                res.status(200).send(user);
            }
        })
        .catch((err) => {
            console.error('SERVER ERROR: failed to PUT user after correct answer', err);
            res.sendStatus(500);
        });
});

// **************** DELETE ROUTES ********************

// DELETE USER BY USER ID
router.delete('/:_id', (req, res) => {
    const { _id } = req.params;

    User.findByIdAndDelete(_id)
    .then((deletedUser) => res.status(200).send(deletedUser))
    .catch((err) => {
        console.error('delete user ERROR server', err)
        res.sendStatus(500);
    })
})


module.exports = router