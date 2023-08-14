

/**
 * Abstract class for defining controllers.
 * @date 8/14/2023 - 3:31:51 PM
 *
 * @class AbstractController
 * @typedef {AbstractController}
 */
class AbstractController{
    constructor(service){
        this.service = service;
    }
}

module.exports = AbstractController;