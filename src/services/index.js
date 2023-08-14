const AddressService = require('./addressService');
const OrderService = require('./orderService');
const StoreService = require('./storeService');
const UserService = require('./userService');

const repositories = require('../repositories');
console.log(repositories);

const addressServiceObject = new AddressService(repositories.userRepository);
const orderServiceObject = new OrderService(repositories.orderRepository, addressServiceObject);
const userServiceObject = new UserService(repositories.userRepository);
const storeServiceObject = new StoreService(repositories.userRepository, addressServiceObject, userServiceObject);

module.exports = {
    addressService: addressServiceObject,
    orderService: orderServiceObject,
    userService: userServiceObject,
    storeService: storeServiceObject,
};
