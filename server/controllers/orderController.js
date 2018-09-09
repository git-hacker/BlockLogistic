const express = require('express');
const router = express.Router();
const Order = require('../schema/order');
const User = require('../schema/user');
const ETC = require('../schema/etc');
const Reduce = require('../schema/reduce');
const Safe = require('../schema/safe');
const Pay = require('../schema/pay');

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
    const order = await Order.findOneAndUpdate({ id: req.body.id }, { status: req.body.status });
    const user  = await User.findOne({ id:order.driverIdCard });
    if(req.body.status == 1){
        await User.update({ id:order.driverIdCard },{scoreCredit: user.scoreCredit+1 });
    }else {
        await User.update({ id:order.driverIdCard },{scoreCredit: user.scoreCredit-1 });
    }
    res.json({
        message: 'ok',
    });
}


const createETC = async(req, res) => {
    const body = req.body
    const etc = new ETC(body);
    etc.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    })
}

const reduceOrder = async(req, res) => {
    const body = req.body;
    const reduce = new Reduce(body);
    reduce.save((err, data) => {
       if (err) {
            res.send(err);
       } else {
            res.json(data);
       }
    });
}

const getDetail = async(req, res) => {
    const data = {};
    const reduceData = await Reduce.find({ id: req.query.id});
    const orderData = await Order.findOne({ id: req.query.id});
    const safe = await Safe.findOne({logisticOrderId: req.query.id});
    const pay = await Pay.findOne({logisticOrderId: req.query.id})
    data.reduce = reduceData;
    data.detail = orderData;
    data.safe = safe;
    data.pay = pay;
    res.json(data)
}

const createSafe = async(req, res) => {
    const body = req.body;
    const safe = new Safe(body);
    safe.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    })
}

const payIfFail = async(req, res) => {
    const body = req.body;
    const pay = new Pay(body);
    pay.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
}

router.get('/order', getOrder);
router.post('/createOrder', createOrder);
router.post('/updateOrder', updateOrder);
router.post('/createETC', createETC);
router.post('/reduceOrder', reduceOrder);
router.get('/orderDetail', getDetail);
router.post('/createSafe', createSafe);
router.post('/payIfFail', payIfFail);

module.exports = router;


