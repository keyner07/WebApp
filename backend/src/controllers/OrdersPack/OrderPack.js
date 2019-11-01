const Entity = require('../Entity').Entity;

class OrdersPack extends Entity {
    constructor(title,owner,createdAt, expirationDate){
        super(createdAt, expirationDate)
        this.title = title;
        this.owner = owner;
    }
}

module.exports.OrdersPack = OrdersPack;