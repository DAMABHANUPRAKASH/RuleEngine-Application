// server/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    department: { type: String, required: true },
    income: { type: Number, required: true },
    spend: { type: Number, required: true },
    eligibility: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
