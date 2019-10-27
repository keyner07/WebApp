const db = require('../../database').Database;
const userModel = require('../../models/UserModel');
const mongoose = require('mongoose');

function addUser(user) {
    return new Promise((resolve, reject) => {
        let registerUser = new userModel({  
            id: user.uid,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          })
          registerUser.save()
            .then(doc => {
                // console.log(doc);
                resolve(doc);
            }).catch( err => {
                console.error(`[UserRepository] ${err}`);
                reject();
            })

    })
}

function findById(uid){
    return new Promise((resolve, reject) => {
        userModel
            .find({
                id: uid
            })
            .then(doc => {
                resolve(doc);
            })
            .catch(err => {
                console.error(`[UserFinById] ${err}`);
                reject();
            })
    })
}

function find(){
    return new Promise((resolve, reject) => {
        userModel.find()
            .then(doc => resolve(doc))
            .catch(err => {
                console.error(`[UserList] ${err}`);
                reject();
            })
    })
}

function deleteUser(uid){
    return new Promise((resolve, reject) => {
        userModel
            .findOneAndRemove({
                id: uid
            })
            .then(response => resolve(response))
            .catch(err => {
                console.error(`[DeleteUser] ${err}`);
                reject();
            })
    })
}



module.exports = {
    addUser,
    findById,
    lists: find,
    deleteUser
}