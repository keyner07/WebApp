const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
// const User = require('./src/controllers/User/User').User;
// const UserRepository = require('./src/controllers/User/UserRepository');
// const Entity = require('../Entity').Entity;
// const db = require('./src/database').Database;

const app = express();

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended : true }));
routes(app);
// let today = new Date();
// var keyner = new User(1, "Keyner Baez", "skerling19@hotmail.com", "1234",today, today);
// console.log(keyner);
// UserRepository.addUser(keyner);
app.listen(3000, () => {
    console.log('Escuchhando en puerto 3000');
})