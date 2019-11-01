const Entity = require('../Entity').Entity;

class User extends Entity {
    constructor(name, email, password,createdAt, updateAt){
        super(createdAt, updateAt);
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports.User = User;