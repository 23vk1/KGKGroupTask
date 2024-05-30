

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Bid = require('../models/Bid');
const Item = require('../models/Item');
const sendNotification = require('../utils/sendNotification');



router.post('/', auth, async (req, res) => {
    const { item_id, bid_amount } = req.body;



    try {
        const item = await Item.findByPk(item_id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        if (bid_amount <= item.current_price) {
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


        res.status(201).json(bid);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
