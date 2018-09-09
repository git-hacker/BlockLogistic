const mongoose = require('mongoose');

const paySchema = new mongoose.Schema({
    customerAddr: String,
    id: Number,
    logisticOrderId: Number,
    payIfFail: Number,
});

module.exports = mongoose.model('pay', paySchema);
