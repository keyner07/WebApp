const ordersPackModel = require('../../models/OrdersPackModel');
const mongoose = require('mongoose');


function findById(uid){
    return new Promise((resolve, reject) => {
        ordersPackModel.findOne({
            id: uid
        })
        .then(doc => resolve(doc))
        .catch(err => {
            console.error(`[OrdersPackRepository] ${err}`)
            reject();
        })
    })
}
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

function addOrderPack(OrdersPack){
    return new Promise((resolve, reject) => {
        let registerOrdersPack = new ordersPackModel({
            id: OrdersPack.uid,
            owner: OrdersPack.owner,
            title: OrdersPack.title,
            createdAt: OrdersPack.createdAt,
            expirationDate: OrdersPack.expirationDate
        })
        registerOrdersPack.save()
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[AddOrderPack] ${err}`);
                reject();
            })
    })
}

function deleteOrderPack(uid){
    return new Promise((resolve, reject) => {
        ordersPackModel
            .findOneAndRemove({
                id: uid
            })
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[DeleteOrderPack] ${err}`)
                reject();
            })
    })
}

function expirationDate(min){
    let date = new Date.now;
    if(min > 60){
        date.setHours(date.getHours() + 1)
    }
    date.setDate(date.getDate() + 1);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
}

module.exports = {
        addOrderPack,
        findById,
        lists: find,
        deleteOrderPack
}