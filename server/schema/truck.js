const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    name: String,
    credit: Number,
    id: String,
    tel: String,
});

module.exports = mongoose.model('Trucks', truckSchema);