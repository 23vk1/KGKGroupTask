const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const user = await User.create({ username, email, password, role });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true});
      res.json({ user });


    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  module.exports = router;




