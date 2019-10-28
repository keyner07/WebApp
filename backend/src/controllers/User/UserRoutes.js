const express = require('express');
const router = express.Router();
const userRepository = require('../User/UserRepository');
const User = require('./User').User;

router.post('/signUp', (req, res) => {
    let today = new Date();
    let registerUser = new User(req.body.id, req.body.name, req.body.email, req.body.password, today, today);
    userRepository.addUser(registerUser)
        .then((doc) => {
            res.status(201).send(`Su id es ${doc.id}`);
            return;
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
            return;
        })
})

router.get('/find', (req, res) => {
    let id = req.query.id;
    userRepository.findById(id)
        .then((doc) => {
            // if(!doc){
            //     res.status(404).send('No se encontro ese usuario');
            //     // res.send('No se ha encontrado')
            //     return;
            // }
            // else{
                res.status(200).send(doc);
                return;
            // }
        })
        .catch((err) => {
            res.status(500).send('Ocurrio un error');
            // res.send('Ocurrio un error')
            return;
        })
})
router.get('/:id/lists',(req, res) => {
    userRepository.lists()
        .then((doc) => {
            if(!doc) res.status(404).send('No hay user');
            else{
                res.status(200).send(doc);
            }
        })
})

router.post('/delete',(req, res) => {
    let id = req.query.id;
    userRepository.deleteUser(id)
        .then((response) => {
            if(!response) res.status(404).send('No hay user con ese id')
            else {
                res.status(200).send('Eliminado correcto');
            }
        })
        .catch(() => res.status(500).send('Ocurrio un error, intentelo mas tarde'))
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userRepository.login(email, password)
        .then((response) => {
            if(!response) res.status(404).send('Usuario o contraseña incorrecta')
            res.status(200).send(`Se ha logueado correctamente. Su id es ${response.id}`);
        })
})


module.exports = router;