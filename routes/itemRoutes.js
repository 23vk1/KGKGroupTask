const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middlewares/auth');



router.post('/',auth, async (req, res)=>{
    const { name, description, starting_price, image_url, auction_end_time } = req.body;
    try{
        const newItem = await Item.create({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url,
            auction_end_time,
            created_at: new Date()
        })
        res.status(201).json(newItem);
    }
    catch(err){
        res.status(400).json({error : err.message });
    }
});


module.exports = router;
