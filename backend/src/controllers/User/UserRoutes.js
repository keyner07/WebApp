const express = require('express');
const router = express.Router();
const userRepository = require('../User/UserRepository');
const User = require('./User').User;

router.post('/singUp', (req, res) => {
    let today = new Date();
    let registerUser = new User(req.body.id, req.body.name, req.body.email, req.body.password, today, today);
    userRepository.addUser(registerUser)
        .then((doc) => {
            res.send(`Su id es ${doc.id}`).sendStatus(201);
            return;
        })
        .catch(() => {
            res.send('Ha ocurrido un error').sendStatus(500);
            return;
        })
})

router.get('/find', (req, res) => {
    let id = req.query.id;
    userRepository.findById(id)
        .then((doc) => {
            if(!doc.id){
                res.sendStatus(404);
                // res.send('No se ha encontrado')
                return;
            }
            else{
                res.send(doc).sendStatus(200);
                return;
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            // res.send('Ocurrio un error')
            return;
        })
})
router.get('/lists',(req, res) => {
    userRepository.lists()
        .then((doc) => {
            if(!doc) res.send('No hay user');
            else{
                res.send(doc);
            }
        })
})

router.post('/delete',(req, res) => {
    let id = req.query.id;
    userRepository.deleteUser(id)
        .then((response) => {
            if(!response) res.send('No hay user con ese id')
            else {
                res.send('Eliminado correcto').sendStatus(200);
            }
        })
        .catch(() => res.sendStatus(500))
})


module.exports = router;