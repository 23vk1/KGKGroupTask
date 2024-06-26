const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const {logger} = require('./logger');



router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt'],
    });

    if (!user) {
      logger.logs("User not found", 3);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    // cutomze this log message 
    logger.logs("error message of userRouter", 3);
    res.status(500).json({ error: err.message });
  }
});


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const user = await User.create({ username, email, password, role });
      res.json(user);
    } catch (err) {
      logger.logs("error message of userRouter", 3);
      res.status(400).json({ error: err.message });
    }
  });


  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        logger.logs("User not found", 3);
        return res.status(400).json({ error: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.logs("Invalid credentials", 3);
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true});
      res.json({ user });


    } catch (err) {
      logger.logs("error message of userRouter", 3);
      res.status(400).json({ error: err.message });
    }
  });


  module.exports = router;




