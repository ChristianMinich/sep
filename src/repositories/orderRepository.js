const AbstractRepository = require("./abstractRepository");
class OrderRepository extends AbstractRepository {
  constructor(database) {
    super(database);
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

  allOrdersByEmployee(EMPLOYEE_NAME) {
    let sql = "SELECT * FROM DELIVERY_ORDER WHERE EMPLOYEE_NAME = ?";
    let params = [EMPLOYEE_NAME];
    return this.database.queryAllData(sql);
  }

  insertOrder(
    timestamp,
    employeeName,
    packageSize,
    deliveryDate,
    customDropoffPlace,
    storeID,
    addressID
  ) {
    let sql = `
    INSERT INTO
        DELIVERY_ORDER (timestamp, employeeName, packageSize, deliveryDate, customDropoffPlace, storeID, addressID)
    VALUES
        (?, ?, ?, ?, ?, ?, ?);
    `;
    let params = [
      timestamp,
      employeeName,
      packageSize,
      deliveryDate,
      customDropoffPlace,
      storeID,
      addressID,
    ];
    return this.database.insertTuple(sql, params);
  }

  insertHandlingInfo(orderID, handlingInfo) {
    let sql = `
    INSERT INTO
        HANDLINGINFO (orderID, handlingInfo)
    VALUES
        (?, ?);
    `;
    let params = [orderID, handlingInfo];
    return this.database.insertTuple(sql, params);
  }

  insertRecipient(orderID, firstName, lastName, addressID) {
    let sql = `
    INSERT INTO
        RECIPIENT (orderID, firstName, lastName, addressID)
    VALUES
        (?, ?, ?, ?);
    `;
    let params = [orderID, firstName, lastName, addressID];
    return this.database.insertTuple(sql, params);
  }

  selectOrderID(
    timestamp,
    employeeName,
    packageSize,
    deliveryDate,
    customDropoffPlace,
    storeID,
    addressID
  ) {
    let sql = `
    SELECT 
        orderID
    FROM 
        DELIVERY_ORDER
    WHERE 
        timestamp = ? 
    AND 
        employeeName = ? 
    AND 
        packageSize = ? 
    AND 
        deliveryDate = ? 
    AND 
        customDropoffPlace = ? 
    AND 
        storeID = ? 
    AND 
        addressID = ?;
    `;
    let params = [
      timestamp,
      employeeName,
      packageSize,
      deliveryDate,
      customDropoffPlace,
      storeID,
      addressID,
    ];
    return this.database.queryOneDataSet(sql, params);
  }

  selectAllOrdersOfStore(storeID) {
    let sql = `
    SELECT
        o.orderID,
        o.timestamp,
        o.employeeName,
        o.packageSize,
        o.deliveryDate,
        o.customDropoffPlace,
        h.handlingInfo,
        r.firstName,
        r.lastName,
        a.street,
        a.houseNumber,
        z.ZIP
    FROM
        DELIVERY_ORDER o
    JOIN
        HANDLINGINFO h ON o.orderID = h.orderID
    JOIN
        RECIPIENT r ON o.orderID = r.orderID
    JOIN
        ADDRESS a ON o.addressID = a.addressID
    JOIN
        ZIP z ON a.zipID = z.zipID
    WHERE
        storeID = ?
    ORDER BY
        o.orderID ASC;
    `;
    let params = [storeID];
    return this.database.queryAllData(sql, params);
  }

  selectHandlingInfo(orderID) {
    let sql = `
    SELECT
        *
    FROM 
        HANDLINGINFO
    WHERE
        orderID = ?;
    `;
    let params = [orderID];
    return this.database.queryOneDataSet(sql, params);
  }

  selectRecipient(orderID) {
    let sql = `
    SELECT 
        *
    FROM
        RECIPIENT
    WHERE
        orderID = ?;
    `;
    let params = [orderID];
    return this.database.queryOneDataSet(sql, params);
  }

  deleteOrder(orderID) {
    let sql = "DELETE FROM ORDER WHERE ORDER_ID = ?";
    let params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  deleteHandlingInfo(orderID) {
    let sql = `
    SELECT
        *
    FROM
        HANDLING_INFO
    WHERE
        orderID = ?;
    `;
    let params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  deleteRecipient(firstname, lastname) {
    let sql = "DELETE FROM RECIPIENT WHERE firstname = ? AND lastname";
    let params = [firstname, lastname];
    return this.database.queryWithoutResponse(sql, params);
  }
}

module.exports = OrderRepository;
