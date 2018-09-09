const mongoose = require('mongoose');

const etcSchema = new mongoose.Schema({
    customerAddr: String,
    eth: Number,
    id: Number,
});

module.exports = mongoose.model('etc', etcSchema);
