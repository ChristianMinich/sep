function createObject(
    order
  ) {
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
            }
        },
        packageSize: order.packageSize,
        handlingInfo: order.handlingInfo,
        deliveryDate: order.deliveryDate,
        customDropOffPlace: order.customDropOffPlace,
    };
  }
  
  module.exports = { createObject };
  