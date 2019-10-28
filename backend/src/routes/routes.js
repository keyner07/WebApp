const express = require('express');
const router = express.Router();
const userRepository = require('../controllers/User/UserRepository');
const user = require('../controllers/User/UserRoutes');

// router.post('/login', (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     userRepository.login(email, password)
//         .then((response) => {
//             if(!response) res.status(404).send('Usuario o contraseña incorrecta')
//             res.redirect(307,`/${response.id}`);
//         })
// })

const routes = function (server) {
    server.use('/', user);
    // server.use('/:id', user);
}


module.exports = routes;