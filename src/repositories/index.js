const database = require('./database');
const BaseRepository = require('./baseRepository');
const OrderRepository = require('./orderRepository');
const UserRepository = require('./userRepository');

const baseRepositoryObject = new BaseRepository(database);
const orderRepositoryObject = new OrderRepository(baseRepositoryObject);
const userRepositoryObject = new UserRepository(baseRepositoryObject);

module.exports = {
    baseRepository: baseRepositoryObject,
    orderRepository: orderRepositoryObject,
    userRepository: userRepositoryObject
};
