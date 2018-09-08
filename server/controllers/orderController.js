const express = require('express');
const router = express.Router();
const Order = require('../schema/order');
const User = require('../schema/user');

const getOrder = async(req, res) => {
    let orders = await Order.find({ custumerIdCard: req.query.userId });
    let orders1 = [];

    orders.map(async (order, index) => {
        let order2 = {};
        const userOne = await User.findOne({ id: order.driverIdCard});
        order2 = {
            id: order.id,
            eth: order.eth,
            driverIdCard: order.driverIdCard,
            driverAddr: order.driverAddr,
            custumerIdCard: order.custumerIdCard,
            custumerAddr: order.custumerAddr,
            transactionHash: order.transactionHash,
            status: order.status,
            driverName: userOne.name
        };
        orders1.push(order2);
        if ((orders.length - 1) === index) {
            res.json(orders1);
        }
    });
}

const createOrder = async(req, res) => {
    const body = req.body;
    body.driverName = '';
    body.status = 0;
    const order = new Order(body);
    order.save((err, order) => {
        if (err) {
            res.send(err);
        } else {
            res.send(order);
        }
    })
}

const updateOrder = async(req, res) => {
    console.log('type', typeof req.body.id);
    const order = await Order.update({ id: req.body.id }, { status: 1 })
    res.json({
        message: 'ok',
    });
}

router.get('/order', getOrder);
router.post('/createOrder', createOrder);
router.post('/updateOrder', updateOrder);

module.exports = router;


