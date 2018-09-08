const express = require('express');
const router = express.Router();
const Truck = require('../schema/truck');

const getTruck = async(req, res) => {
    const trucks = await Truck.find({});
    res.json(trucks);
}

router.get('/truck', getTruck);

module.exports = router;


