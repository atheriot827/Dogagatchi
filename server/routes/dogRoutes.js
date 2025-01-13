const express = require('express');
const router = express.Router();
const {Dog, User} = require('../db/index');

// **************** GET ROUTES ********************

//GET DOG BY USER ID

router.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    Dog.find().where({owner: userId}).then((dogsArr) => {
        User.findById(userId).then(({breeds}) => {
            res.status(200).send({dogsArr, breeds});
        }).catch((err) => {
            console.error('SERVER ERROR: failed to GET user breeds list by id', err);
            res.sendStatus(500);
        });
    }).catch((err) => {
        console.error('SERVER ERROR: failed to GET dog by userId', err);
        res.sendStatus(500);
    });
});

//GET DOG BY DOG ID

router.get('/id/:dogId', (req, res) => {
    const {dogId} = req.params;

    Dog.findById(dogId).then((dog) => {
        res.status(200).send(dog);
    }).catch((err) => {
        console.error('SERVER ERROR: failed to GET dog by id', err);
        res.sendStatus(500);
    });
});

// **************** POST ROUTES ********************

//POST DOG

router.post('/', (req, res) => {
    const {name, img, owner} = req.body;
    const status = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    Dog.create({
        name, img, owner, feedDeadline: status, walkDeadline: status,

        medicineDeadline: status,

        isGroomed: false,

    }).then(() => {
        return User.findByIdAndUpdate(owner, {
            $inc: {coinCount: -15, dogCount: -1}, $pull: {breeds: img}
        }, {new: true}).catch((err) => {
            console.error('SERVER ERROR: failed to UPDATE user', err);
            res.sendStatus(500);
        });
    }).then((updatedUser) => {
        res.status(201).send(updatedUser);
    }).catch((err) => {
        console.error('SERVER ERROR: failed to CREATE dog', err);
        res.sendStatus(500);
    });
});

// **************** PUT ROUTES ********************

//PUT BY DOG ID

router.put('/:dogId', (req, res) => {
    const {dogId} = req.params;
    const {status, cost} = req.body;

    Dog.findByIdAndUpdate(dogId, status, {returnDocument: 'after'}).then((updatedDog) => {
        if (updatedDog && cost === -3) {
            User.findByIdAndUpdate(updatedDog.owner, {$inc: {coinCount: cost}}, {new: true}).then((updatedUser) => {
                res.status(200).send(updatedUser);
            }).catch((err) => {
                console.error('SERVER ERROR: failed to UPDATE user coins by id', err);
                res.sendStatus(500);
            });
        } else if (updatedDog) {
            User.findById(updatedDog.owner).then((updatedUser) => {
                res.status(200).send(updatedUser);
            }).catch((err) => {
                console.error('SERVER ERROR: failed to UPDATE user coins by id', err);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        console.error('SERVER ERROR: failed to UPDATE dog status by id', err);
        res.sendStatus(500);
    });
});


// **************** DOG STATS ROUTES ********************

router.put('/stats/:dogId', async (req, res) => {
    const {dogId} = req.params;
    const {status} = req.body;
    if (status.decreaseHealth) {
        try {
            const healthChange = status.decreaseHealth;
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {$inc: {health: -healthChange}}, {returnDocument: 'after'});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error decrementing dog health stat', error);
        }
    }

    if (status.increaseHealth) {
        try {
            const healthChange = status.increaseHealth;
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {$inc: {health: healthChange}}, {returnDocument: 'after'});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error incrementing dog health stat', error);
        }

    }

    if (status.increaseAttackDmg) {
        try {
            const attackChange = status.increaseAttackDmg;
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {$inc: {attackDmg: attackChange}}, {returnDocument: 'after'});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error incrementing dog health stat', error);
        }
    }

    if (status.maxStats) {
        try {
            const maxValue = status.maxStats;
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {
                $set: {
                    attackDmg: maxValue, health: maxValue
                }
            }, {returnDocument: 'after'});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error incrementing dog health stat', error);
        }
    }
});


// **************** DOG COMMANDS ROUTES ********************
router.put('/commands/:dogId', async (req, res) => {
    const {dogId} = req.params;
    const {status} = req.body;
    const newCommand = status.newCommand;
    const commandType = status.commandType;

    if (newCommand && commandType === 'heal') {
        try {
            const currentDog = await Dog.findById(dogId);
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {
                $set: {
                    'commands.0': newCommand
                }
            }, {new: true});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error updating command', error);
        }
    }

    if (newCommand && commandType === 'increaseAttack') {
        try {
            const updatedDog = await Dog.findByIdAndUpdate(dogId, {
                $set: {
                    'commands.1': newCommand
                }
            }, {new: true});
            res.status(200).send(updatedDog);
        } catch (error) {
            console.error('Error updating command', error);
        }
    }
});


// **************** DELETE ROUTES ********************

// DELETE ALL DOGS BY USER ID
router.delete('/all/:ownerId', (req, res) => {
    const {ownerId} = req.params;

    Dog.deleteMany({owner: ownerId}).then((deleted) => {
        console.log(deleted);
        res.sendStatus(200);
    }).catch((err) => {
        console.error('deleted all dogs by user ERROR', err);
    });
});

//DELETE BY DOG ID
router.delete('/:dogId', (req, res) => {
    const {dogId} = req.params;

    Dog.findByIdAndDelete(dogId).then((deletedDog) => {
        if (deletedDog) {
            return res.status(200).send(deletedDog);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        console.error('SERVER ERROR: failed to DELETE dog by id', err);
        res.sendStatus(500);
    });
});

module.exports = router;