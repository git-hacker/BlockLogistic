const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    id: String,
    distance: String,
    price: String,
});

module.exports = mongoose.model('Orders', orderSchema);