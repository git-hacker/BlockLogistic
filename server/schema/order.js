const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: Number,
    eth: Number,
    driverIdCard: Number,
    driverAddr: String,
    custumerIdCard: Number,
    custumerAddr: String,
    transactionHash: String,
});

module.exports = mongoose.model('Orders', orderSchema);