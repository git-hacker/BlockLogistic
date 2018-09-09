const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    id: {
        type: String,
        unique: true,
    },
    password: String,
    is_sign: Number,
    userType: Number,
    scoreCredit: Number,
    // user: { type: Schema.Types.ObjectId, ref: '_user' }
});

module.exports = mongoose.model('UserSession', userSchema);
