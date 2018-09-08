const express = require('express');
const router = express.Router();
// const Truck = require('../schema/truck');
const User = require('../schema/user');

const getTruck = async(req, res) => {
    const trucks = await User.find({ userType: 2, is_sign: 1 });
    res.json(trucks);
}

router.get('/truck', getTruck);


module.exports = router;


