const express = require('express');
const router = express.Router();
const userRepository = require('../User/UserRepository');
const User = require('./User').User;
const OrdersPack = require('../OrdersPack/OrdersPack').OrdersPack;
const OrdersPackRepository = require('../OrdersPack/OrdersPackRepository');
const Order = require('../Order/Order').Order;
const OrderRepository = require('../Order/OrderRepository');
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

router.delete('/delete',(req, res) => {
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
router.post('/:id/Order', (req, res) => {
    let today = new Date();
    let registerOrdersPack = new OrdersPack(req.body.id, req.body.title,req.params.id, today, today);
    OrdersPackRepository.addOrderPack(registerOrdersPack)
        .then((doc) => {
            res.status(201).send(`Su id es ${doc.id}`);
            return;
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
            return;
        })
})

router.post('/:id/OrderList', (req, res) => {
    let createOrder = new Order(req.body.id,req.params.id, req.body.productName, req.body.size, req.body.flavor, req.body.price, req.body.paymentMethod, req.body.payed);
    OrderRepository.addOrderList(req.body.idOrder, createOrder)
        .then((doc) => {
            res.status(200).send(`Creado correctamente su id es ${doc.id}`);
            return;
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
            return;
        })
})
router.delete('/:id/deleteOrder', (req, res) => {
    OrderRepository.deleteOrderList(req.query.id, req.params.id)
        .then((doc) => {
            res.status(200).send('Eliminado correctamente');
        })
        .catch(() => {
            res.status(500).send('HHa ocurrido un error');
        })
})

module.exports = router;