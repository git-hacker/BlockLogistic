const express = require('express');
const router = express.Router();
const Order = require('../schema/order');

const getOrder = async(req, res) => {
    const orders = await Order.find({userId: req.query.userId});
    res.json(orders);
}

const createOrder = async(req, res) => {
    const body = req.body;
    const order = new Order(body);
    order.save((err, order) => {
        if (err) {
            res.send(err);
        } else {
            res.send(order);
        }
    })
}

router.get('/order', getOrder);
router.post('/createOrder', createOrder);

module.exports = router;


