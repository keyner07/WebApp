const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

let UserSchema = new Schema({
    id: {type: Number, required: true, index: { unique: true}},
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, unique: true, lowercase: true, index: { unique: true },validate: (value) => { return validator.isEmail(value)}},
    password: {type: String, required: true},
    createdAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema);