const Entity = require('../Entity').Entity;

class User extends Entity {
    constructor(uid, name, email, password,createdAt, updateAt){
        super(uid, createdAt, updateAt);
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports.User = User;