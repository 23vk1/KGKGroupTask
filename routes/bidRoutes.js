

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Bid = require('../models/Bid');
const Item = require('../models/Item');
const sendNotification = require('../utils/sendNotification');
const { libUtil } = require('./utils');


router.get('/', auth, async (req, res) => {

  try {
    const bid = await Bid.findAll({
      order: [['created_at', 'DESC']],
    });
    libUtil.logger("API request fullfield successfully (get '/') ", 1);
    res.json(bid);
  } catch (err) {
    libUtil.logger("error while get '/bid/'", 3);
    res.status(500).json({ error: err.message });

  }
});



router.post('/', auth, async (req, res) => {
  const { item_id, bid_amount } = req.body;
  try {
    const item = await Item.findByPk(item_id);
    if (!item) {
      libUtil.logger("item not found", 3);
      return res.status(404).json({ error: 'Item not found' });
    }
    if (bid_amount <= item.current_price) {
      libUtil.logger("Bid amount must be higher than the current price", 2);
      return res.status(400).json({ error: 'Bid amount must be higher than the current price' });
    }
    const bid = await Bid.create({
      item_id,
      user_id: req.user.id,
      bid_amount,
      created_at: new Date(),
    });
    item.current_price = bid_amount;
    await item.save();
    const io = req.app.get('io');
    item.user_id
    sendNotification(req.user.id, `New bid placed on your item: ${item.name}`, io);
    libUtil.logger( `New bid placed on your item: ${item.name}`, 1);
    res.status(201).json(bid);
  }
  catch (err) {
    libUtil.logger("error while making new bid", 3);
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
