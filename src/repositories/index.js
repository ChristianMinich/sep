const database = require("./database");
const BaseRepository = require("./baseRepository");
const OrderRepository = require("./orderRepository");
const UserRepository = require("./userRepository");

/**
 * Represents a set of repository objects initialized with the database connection.
 * @typedef {Object} RepositorySet
 * @property {BaseRepository} baseRepository - The base repository object.
 * @property {OrderRepository} orderRepository - The order repository object.
 * @property {UserRepository} userRepository - The user repository object.
 */

const baseRepositoryObject = new BaseRepository(database);
const orderRepositoryObject = new OrderRepository(baseRepositoryObject);
const userRepositoryObject = new UserRepository(baseRepositoryObject);

/**
 * The set of repository objects.
 * @type {RepositorySet}
 */
module.exports = {
  baseRepository: baseRepositoryObject,
  orderRepository: orderRepositoryObject,
  userRepository: userRepositoryObject,
};
