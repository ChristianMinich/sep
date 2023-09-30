/**
 * Creates an object with structured order information.
 * @param {Object} order - The order object containing order details.
 * @return {Object} An object with structured order information.
 */
function createObject(order) {
  return {
    orderID: order.orderID,
    timestamp: order.timestamp,
    employeeName: order.employeeName,
    recipient: {
      firstName: order.firstName,
      lastName: order.lastName,
      address: {
        street: order.street,
        houseNumber: order.houseNumber,
        zip: String(order.zip),
      },
    },
    packageSize: order.packageSize,
    handlingInfo: order.handlingInfo,
    deliveryDate: String(order.deliveryDate).substring(0, 10),
    customDropOffPlace: order.customDropOffPlace,
  };
}

module.exports = { createObject };
