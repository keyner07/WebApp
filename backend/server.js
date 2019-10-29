const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const db = require('./src/database').Database;

const app = express();

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended : true }));
routes(app);



app.listen(3000, () => {
    console.log('Escuchhando en puerto 3000');
})