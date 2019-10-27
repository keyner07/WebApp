const express = require('express');
const user = require('../controllers/User/UserRoutes');


const routes = function (server) {
    server.use('/test', user);
}

module.exports = routes;