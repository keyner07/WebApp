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
            .findOne({
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

function signIn(emailUser, passwordUser){
    return new Promise((resolve, reject) => {
        userModel
            .findOne({
                email: emailUser,
                password: passwordUser
            })
            .then(response => resolve(response))
            .catch(err => {
                console.error(`[SignIn] ${err}`)
                reject();
            })

    })
}



module.exports = {
    addUser,
    findById,
    lists: find,
    deleteUser,
    login: signIn
}