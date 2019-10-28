const Entity = require('../Entity').Entity;

class OrdersPack extends Entity {
    constructor(uid,title,owner,createdAt, expirationDate){
        super(uid,createdAt, expirationDate)
        this.title = title;
        this.owner = owner;
    }
}

module.exports.OrdersPack = OrdersPack;