const ordersPackModel = require('../../models/OrderModel');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

//Buscar lista de ordenes por uid
function findById(uid){
    return new Promise((resolve, reject) => {
        ordersPackModel.findOne({
            _id: uid
        })
        .then(doc => resolve(doc))
        .catch(err => {
            console.error(`[OrdersPackRepository] ${err}`)
            reject();
        })
    })
}

//Buscar todas las listas de ordenes
function find() {
    return new Promise((resolve, reject) => {
        ordersPackModel.find()
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[OrdersPackList] ${err}`);
                reject();
            })
    })
}

// Crear una lista de ordenes
function addOrderPack(OrdersPack){
    return new Promise((resolve, reject) => {
        let registerOrdersPack = new ordersPackModel({
            owner: ObjectId(OrdersPack.owner),
            title: OrdersPack.title,
            createdAt: OrdersPack.createdAt,
            expirationDate: OrdersPack.updateAt
        })
        registerOrdersPack.save()
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[AddOrderPack] ${err}`);
                reject();
            })
    })
}

//Borrar una lista de ordenes como parametros id
function deleteOrderPack(uid, idOwner){
    return new Promise((resolve, reject) => {
        ordersPackModel
            .findOneAndRemove({
                _id: uid,
                owner: idOwner
            })
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[DeleteOrderPack] ${err}`)
                reject(err);
            })
    })
}


module.exports = {
        addOrderPack,
        findById,
        lists: find,
        deleteOrderPack
}