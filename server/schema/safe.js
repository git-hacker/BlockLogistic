const mongoose = require('mongoose');

const safeSchema = new mongoose.Schema({
    customerAddr: String,
    customerIdCard: String,
    eth: Number,
    goods: String,
    id: Number,
    logisticOrderId: Number,
    payIfFail: Number
});

module.exports = mongoose.model('safe', safeSchema);
