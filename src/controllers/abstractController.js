

/**
 * Abstract class for defining controllers.
 * @date 8/14/2023 - 3:31:51 PM
 *
 * @class AbstractController
 * @typedef {AbstractController}
 */
class AbstractController{
    constructor(orderSvc, storeSvc, userService){
        this.orderSvc = orderSvc;
        this.storeSvc = storeSvc;
        this.userService = userService;
    }
}

export default AbstractController;