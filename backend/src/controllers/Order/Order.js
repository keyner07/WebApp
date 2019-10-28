class Order {
    constructor(owner, productName, size, flavor, price, paymentMethod, payed){
        this.owner = owner;
        this.productName = productName;
        this.size = size;
        this.flavor = flavor;
        this.price = price;
        this.paymentMethod = paymentMethod;
        this.payed = payed;
    }
}

module.exports.Order = Order;