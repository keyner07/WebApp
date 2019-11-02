const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderPackSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required:true},
    createdAt: {type: Date, default: Date.now()},
    expirationDate: {type: String, required: true},
    orders: [{type: Schema.Types.ObjectId, ref: "User"}]
})

module.exports = mongoose.model('OrderPack', OrderPackSchema);




