const AddressService = require("./addressService");
const OrderService = require("./orderService");
const StoreService = require("./storeService");
const UserService = require("./userService");

const repositories = require("../repositories");

/**
 * Represents a set of service objects.
 * @typedef {Object} ServiceSet
 * @property {AddressService} addressService - The address service object.
 * @property {OrderService} orderService - The order service object.
 * @property {StoreService} storeService - The store service object.
 * @property {UserService} userService - The user service object.
 */

const addressService = new AddressService(repositories.userRepository);
const orderService = new OrderService(
  repositories.orderRepository,
  addressService,
);
const userService = new UserService(repositories.userRepository);
const storeService = new StoreService(
  repositories.userRepository,
  addressService,
  userService,
);

/**
 * The set of service objects.
 * @type {ServiceSet}
 */
module.exports = {
  addressService,
  orderService,
  storeService,
  userService,
};
