const express = require('express');
const router = express.Router();
const userRepository = require('../User/UserRepository');
const User = require('./User').User;
const OrdersPack = require('../OrdersPack/OrderPack').OrdersPack;
const OrdersPackRepository = require('../OrdersPack/OrdersPackRepository');
const Order = require('../Order/Order').Order;
const OrderRepository = require('../Order/OrderRepository');

//Creacion de usuario
router.post('/signUp', (req, res) => {
    let today = new Date();
    let registerUser = new User(req.body.name, req.body.email, req.body.password, today, today);
    userRepository.addUser(registerUser)
        .then((doc) => {
            res.status(201).send(`Su id es ${doc._id}`);
            return;
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
            return;
        })
})

//Buscar un usuario por id
router.get('/find', (req, res) => {
    let id = req.query.id;
    userRepository.findById(id)
        .then((doc) => {
            if(!doc){
                res.status(404).send('No se encontro ese usuario');
                return;
            }
            else{
                res.status(200).send(doc);
                return;
            }
        })
        .catch((err) => {
            res.status(500).send('Ocurrio un error');
            return;
        })
})
//Ense;ar todos los user
router.get('/:id/lists',(req, res) => {
    userRepository.lists()
        .then((doc) => {
            if(!doc) res.status(404).send('No hay user');
            else{
                res.status(200).send(doc);
            }
        })
})
//Eliminar un user
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
//Loguearse
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userRepository.login(email, password)
        .then((response) => {
            if(!response) res.status(404).send('Usuario o contraseña incorrecta')
            res.status(200).send(`Se ha logueado correctamente. Su id es ${response.id}`);
        })
        .catch(() => res.status(500).send('Ha ocurrido un error.'))
})

//Creacion de lista de ordenes
router.post('/:id/Order', (req, res) => {
    let today = new Date();
    // title,owner,createdAt, expirationDate
    let registerOrdersPack = new OrdersPack(req.body.title,req.params.id, today, req.body.expirationDate);
    OrdersPackRepository.addOrderPack(registerOrdersPack)
        .then((doc) => {
            res.status(201).send(`El id de la lista de la orden es ${doc.id}`);
            return;
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
            return;
        })
})
//Ver todas las lista de ordenes
router.post('/:id/OrderList', (req, res) => {
    userRepository.findById(req.params.id)
        .then((doc) => {
            if(!doc.email) res.status(404).send('No existe ese usuario');
            else {
                let createOrder = new Order(req.body.id,req.params.id, req.body.productName, req.body.size, req.body.flavour, req.body.price, req.body.paymentMethod, req.body.payed);
                OrderRepository.addOrderList(req.body.idOrder, createOrder)
                    .then((doc) => {
                        res.status(200).send(`Creado correctamente su id es ${doc.id}`);
                        return;
                    })
                    .catch(() => {
                        res.status(500).send('Ha ocurrido un error');
                        return;
                    })
            }
        }).catch(() => res.status(500).send('Ha ocurrido un error.'))
})

//Eliminar lista de ordenes
router.delete('/:id/deleteOrder', (req, res) => {
    OrderRepository.deleteOrderList(req.query.id, req.params.id)
        .then((doc) => {
            res.status(200).send('Eliminado correctamente');
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error');
        })
})
//Eliminar lista de ordenes
router.delete('/:id/OrderPack', (req, res) => {
    OrdersPackRepository.deleteOrderPack(req.query.idOrder,req.params.id)
            .then((doc) => {
                if(!doc){
                    res.status(404).send('No fue encontrado')
                }
                else{
                    res.status(200).send(doc)
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            })
})
//Crear orden en la lista
router.post('/:id/OrderList/:idOrder', (req, res) => {
    let createOrderList = new Order(req.params.id, req.body.productName, req.body.size, req.body.flavor, req.body.price, req.body.paymentMethod, req.body.payed);
    OrderRepository.addOrderList(req.params.idOrder,createOrderList)
            .then((doc) => {
                if(!doc){
                    res.status(404).send('No fue encontrado')
                }
                else{
                    res.status(200).send('Fue creada su orden')
                }
            })
            .catch(() => res.status(500).send('Ha ocurrido un error'));
})

// Ver todas las ordenes
router.get('/:id/OrderList', (req, res) => {
    OrderRepository.list()
        .then((doc) => {
            if(!doc){
                res.status(404).send('No hay')
            }
            else{
                res.status(200).send(doc)
            }
        })
        .catch(() => {
            res.status(500).send('Ha ocurrido un error')
        })
})

module.exports = router;