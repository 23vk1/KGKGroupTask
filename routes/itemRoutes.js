const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { libUtil } = require('./utils');



router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(items);
    } catch (err) {
        // customize this log as suitable 
        libUtil.logger("error message of itemrouter", 3);
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const items = await Item.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']]
        });
        res.json(items);
    } catch (err) {
        libUtil.logger("error message of itemrouter", 3);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', auth, upload, async (req, res) => {
    const { name, description, starting_price, image_url, auction_end_time } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const newItem = await Item.create({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url: imageUrl,
            auction_end_time,
            created_at: new Date()
        })
        res.status(201).json(newItem);
    }
    catch (err) {
        libUtil.logger("error message of itemrouter", 3);
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { new_price } = req.body
    try {
        const item = await Item.findOne({
            where: { id: req.params.id, user_id: req.user.id },
        });
        if (!item) {
            libUtil.logger("Item not found", 3);
            return res.status(404).json({ error: 'item not found' });
        }
        item.current_price = new_price;
        await item.save();
        res.json(item);
    } catch (err) {
        libUtil.logger("error message of itemrouter", 3);
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', auth, async (req, res) => {

    const itemId = req.params.id;

    try {
        const item = await Item.findOne({
            where: { id: req.params.id, user_id: req.user.id },
        });
        if (!item) {
            libUtil.logger("Item not found", 3);
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.destroy();
        libUtil.logger("Item deleted successfully", 1);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        libUtil.logger("error message of itemrouter", 3);
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;
