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
//Mostrar todas las ordenes
async function list(){
    var  getAll = await ordersListModel.find()
    return new Promise((resolve, reject) => {
        resolve(getAll);
    })

}

//Eliminar por id
async function deleteById(idUser){
    var deletedUser = await ordersListModel.findByIdAndRemove(idUser)
    return new Promise((resolve, reject) => {
        if(!deletedUser){
            reject();
        }
        else{
            resolve(deletedUser);
        }
    })
}
//Actualizar la orden
function updateById(req, res, next) {
    return new Promise((resolve, reject) => {
        ordersListModel.findByIdAndUpdate(req.params.orderId,{
                                productName: req.body.productName, 
                                size: req.body.size, 
                                flavour: req.body.flavour,
                                price: req.body.price,
                                paymentMethod: req.body.paymentMethod,
                                payed: req.body.payed,
                                ownerId: req.body.ownerId,
                                ordersPack: req.body.ordersPack
        })
        .then((doc) => resolve(doc) )
        .catch((err) => {
            console.error(`[updateById] ${err}`);
            reject();
        })

    })
}

module.exports = {
    addOrderList,
    list,
    deleteById,
    updateById
}