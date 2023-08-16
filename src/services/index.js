const AddressService = require('./addressService');
const OrderService = require('./orderService');
const StoreService = require('./storeService');
const UserService = require('./userService');

const repositories = require('../repositories');

const addressService = new AddressService(repositories.userRepository);
const orderService = new OrderService(repositories.orderRepository, addressService);
const userService = new UserService(repositories.userRepository);
const storeService = new StoreService(repositories.userRepository, addressService, userService);

module.exports = {
    addressService,
    orderService,
    storeService,
    userService,
};
