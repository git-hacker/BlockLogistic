const express = require('express');
const router = express.Router();
const Order = require('../schema/order');
const User = require('../schema/user');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();

const getOrder = async(req, res) => {
    let orders = await Order.find({ custumerIdCard: req.query.userId });
    let orders1 = [];
    event.on('mapEnd', () => {
        res.send(orders1);
    });
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
            driverName: userOne.name
        };
        orders1.push(order2);

        if ((orders.length - 1) === index) {
            console.log('')
            event.emit('mapEnd');
        }
        // console.log('userOne._doc', userOne._doc);
        // order2 = Object.assign(order2, userOne._doc);
        //  console.log('order2', order2);
        // order.driverName = userOne.name;
        //  console.log('orders1', orders1);
    });

}

const createOrder = async(req, res) => {
    const body = req.body;
    body.driverName = '';
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


