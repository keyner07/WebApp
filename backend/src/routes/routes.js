const express = require('express');
const router = express.Router();
const userRepository = require('../controllers/User/UserRepository');
const user = require('../controllers/User/UserRoutes');


const routes = function (server) {
    server.use('/', user);
    // server.use('/:id', user);
}


module.exports = routes;