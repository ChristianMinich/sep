class Service{
    constructor(orderService, storeService, userService){
        this.orderService = orderService;
        this.storeService = storeService;
        this.userService = userService;
    }

    toString(){
        return typeof this.orderService + " " + typeof this.storeService + " " + typeof this.userService;
    }
}

module.exports = Service;