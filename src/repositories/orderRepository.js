import AbstractRepository from "./abstractRepository.js";
class OrderRepository extends AbstractRepository{
  constructor(database) {
    super(database);
  }

  placeOrder(EMPLOYEE_NAME, PACKAGE_SIZE, DELIVERYDATE, CUSTOM_DROPPOFF_PLACE, STORE_ID) {
    let sql = `
      INSERT INTO DELIVERY_ORDER (TIMESTAMP, EMPLOYEE_NAME, PACKAGE_SIZE, DELIVERYDATE, CUSTOM_DROPPOFF_PLACE, STORE_ID) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    const currentDate = new Date();
    let params = [currentDate, EMPLOYEE_NAME, PACKAGE_SIZE, DELIVERYDATE, CUSTOM_DROPPOFF_PLACE, STORE_ID];
    return this.database.queryWithoutResponse(sql, params);
  }

  cancelOrder(ORDER_ID) {
    let sql = "DELETE FROM DELIVERY_ORDER WHERE ORDER_ID = ?";
    let params = [ORDER_ID];
    return this.database.queryWithoutResponse(sql, params);
  }

  allOrders(STORE_ID) {
    let sql = "SELECT * FROM DELIVERY_ORDER WHERE STORE_ID = ?";
    let params = [STORE_ID];
    return this.database.queryAllData(sql, params);
  }

  // Add the rest of your functions as methods of the class

  insertOrder(timestamp, employeeName, packageSize, deliveryDate, customDropoffPlace, storeID, addressID) {
    let sql = `
      INSERT INTO DELIVERY_ORDER (timestamp, employeeName, packageSize, deliveryDate, customDropoffPlace, storeID, addressID) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`;
    let params = [timestamp, employeeName, packageSize, deliveryDate, customDropoffPlace, storeID, addressID];
    return this.database.insertTuple(sql, params);
  }

  // Add more methods...

  deleteOrder(orderID) {
    let sql = "DELETE FROM DELIVERY_ORDER WHERE ORDER_ID = ?";
    let params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  // Add more methods...
}

module.exports = OrderRepository;
