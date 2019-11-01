const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let OrderSchema = new Schema({
    ownerId: {type: Schema.Types.ObjectId, ref:"User", required: true},
    productName: {type: String, required: true},
    size: {type: String, required: true},
    flavour: {type:String, required: true},
    price: {type:Number, required: true},
    paymentMethod: {type: String, default: "Efectivo"},
    payed: {type: Boolean, default: false}
})

let OrderPackSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required:true},
    createdAt: {type: Date, default: Date.now()},
    expirationDate: {type: String, required: true},
    orders: [OrderSchema]
})

module.exports = mongoose.model('OrderPack', OrderPackSchema);



