const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let OrderSchema = new Schema({
    ownerId: {type: mongoose.Types.ObjectId, ref:"User", required: true},
    productName: {type: String, required: true},
    size: {type: String, required: true},
    flavour: {type:String, required: true},
    price: {type:Number, required: true},
    paymentMethod: {type: String, default: "Efectivo"},
    payed: {type: Boolean, default: false},
    orderPack: {type: Schema.Types.ObjectId}
})


module.exports = mongoose.model('OrderList', OrderSchema);