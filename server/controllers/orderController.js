const express = require('express');
const router = express.Router();
const Order = require('../schema/order');

const getOrder = async(req, res) => {
    const orders = await Order.find({userId: req.query.userId});
    res.json(orders);
}

router.get('/order', getOrder);

module.exports = router;


