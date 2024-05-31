

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Notification = require('../models/Notification');
const {logger} = require('./logger');



router.get('/', auth, async (req, res) => {
    try {
      const notifications = await Notification.findAll({
        where: { user_id: req.user.id },
        order: [['created_at', 'DESC']],
      });
      res.json(notifications);
    } catch (err) {
      // cutomize this log message
      logger.logs("error message of notificationRouter", 3);
      res.status(500).json({ error: err.message });
    }
  });


  router.put('/:id/read', auth, async (req, res) => {
    try {
      const notification = await Notification.findOne({
        where: { id: req.params.id, user_id: req.user.id },
      });
      if (!notification) {
        logger.logs("Notification not found", 3);
        return res.status(404).json({ error: 'Notification not found' });
      }
      notification.is_read = true;
      await notification.save();
      res.json(notification);
    } catch (err) {
      logger.logs("error message of notificationRouter", 3);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;


