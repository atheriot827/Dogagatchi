const express = require('express');
const router = express.Router();
const {Dog, User} = require('../db/index');

router.post('/exit', (req, res) => {
  console.log('post to the exit test')
  res.sendStatus(201)
});

module.exports = router;