const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    id: {
        type: String,
        unique: true,
    },
    password: String,
    is_sign: Number,
    userType: Number,
});

module.exports = mongoose.model('UserSession', userSchema);
