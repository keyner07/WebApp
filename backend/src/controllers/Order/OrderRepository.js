const ordersListModel = require('../../models/OrderListModel');
const orderPackModel = require('../../models/OrderModel');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;


function addOrderList(idOrder, Order){
    return new Promise((resolve, reject) => {
        let registerOrdersList = new ordersListModel({
            ownerId: ObjectId(Order.ownerId),
            size: Order.size,
            flavour: Order.price,
            paymentMethod: Order.paymentMethod,
            payed: Order.payed,
            orderPack: idOrder
        })
        registerOrdersList.create()
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[AddOrderList] ${err}`);
                reject();
            })
        
    })
}

async function list(){
    var  getAll = await ordersListModel.find()
    return new Promise((resolve, reject) => {
        resolve(getAll);
    })

}


module.exports = {
    addOrderList,
    list
}