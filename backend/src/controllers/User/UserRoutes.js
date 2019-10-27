const express = require('express');
const router = express.Router();
const userRepository = require('../User/UserRepository');
const User1 = require('./User').User;

router.post('/user', (req, res) => {
    let today = new Date();
    let registerUser = new User1(req.body.id, req.body.name, req.body.email, req.body.password, today, today);
    userRepository.addUser(registerUser)
        .then((doc) => {
            res.send(`Su id es ${doc.id}`);
        })
        .catch(() => {
            res.send('Ha ocurrido un error');
        })
})


module.exports = router;