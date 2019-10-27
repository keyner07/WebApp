const mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'WebBonetti';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}


///
// const UserRepository = require('./controllers/User/UserRepository');
// let today = new Date();
// var keyner = new User(1, "Keyner Baez", "skerling19@hotmail.com", "1234",today, today);
// UserRepository.addUser(keyner);


//


module.exports = new Database();