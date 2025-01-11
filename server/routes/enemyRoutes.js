const express = require('express');

const router = express.Router();
const { Enemy } = require('../db/index');

// Get random enemy scaled to player level
router.get('/random/:dogLevel', async (req, res) => {
  try {
    const { dogLevel } = req.params;

    // Get all possible enemies for this level
    const enemies = await Enemy.find({
      'levelRange.min': { $lte: dogLevel},
      'levelRange.max': { $gte: dogLevel }
    });

    if (!enemies.length) {
      return res.status(404).send('No suitable enemies found.');
    }

    // Select random enemy
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    // Scale enemy stats based on dog level
    const levelMultiplier = 1 + (Number(dogLevel) * 0.1);
    const scaledEnemy = {
      ...randomEnemy.toObject(),
      health: Math.floor(randomEnemy.baseHealth * levelMultiplier),
      attack: Math.floor(randomEnemy.baseAttack * levelMultiplier),
      rewards: {
        coins: Math.floor(randomEnemy.rewards.coins * levelMultiplier),
        experience: Math.floor(randomEnemy.rewards.experience * levelMultiplier)
      }
    };

    return res.status(200).send(scaledEnemy);
  } catch (error) {
    console.error('Error getting random enemy:', error);
    return res.sendStatus(500)
  }
});

// Get specific enemy type
router.get('/type/:enemyType', async (req, res) => {
  try {
    const { enemyType } = req.params;
    const enemy = await Enemy.findOne({ type: enemyType });

    if (!enemy) {
      return res.status(404).send('Enemy type not found');
    }

    return res.status(200).send(enemy);
  } catch (error) {
    console.error('Error getting enemy by type:', error);
    return res.sendStatus(500)
  }
});

module.exports = router;
