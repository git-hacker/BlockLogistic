const mongoose = require('mongoose');

const reduceSchema = new mongoose.Schema({
    id: Number,
    etcAddr: String,
    eth: Number,
    transactionHash: String,
});

module.exports = mongoose.model('reduce', reduceSchema);
