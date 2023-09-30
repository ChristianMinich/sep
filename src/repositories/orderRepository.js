const AbstractRepository = require("./abstractRepository");
/**
 * A repository class for handling database operations related to orders and order-related data.
 * Extends the AbstractRepository class.
 * @extends AbstractRepository
 */
class OrderRepository extends AbstractRepository {
  /**
   * Creates an instance of the OrderRepository class.
   * @constructor
   * @param {Database} database - The database object used for database operations.
   */
  constructor(database) {
    super(database);
  }

  /**
   * Deletes an order from the database based on its order ID.
   *
   * @param {number} orderID - The unique identifier of the order to be deleted.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  deleteOrder(orderID) {
    const sql = "DELETE FROM DELIVERY_ORDER WHERE ORDER_ID = ?";
    const params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  /**
   * Deletes handling information related to an order from the database based on its order ID.
   *
   * @param {number} orderID - The unique identifier of the order for which handling information should be deleted.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  deleteHandlingInfo(orderID) {
    const sql = "DELETE FROM HANDLINGINFO WHERE ORDER_ID = ?";
    const params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  /**
   * Retrieves all orders associated with a specific store from the database.
   *
   * @param {number} STORE_ID - The unique identifier of the store for which orders should be retrieved.
   * @return {Promise<Array>} A Promise that resolves with an array of order objects retrieved from the database.
   */
  allOrders(STORE_ID) {
    const sql = "SELECT * FROM DELIVERY_ORDER WHERE STORE_ID = ?";
    const params = [STORE_ID];
    return this.database.queryAllData(sql, params);
  }

  /**
   * Retrieves all orders associated with a specific employee from the database.
   *
   * @param {string} EMPLOYEE_NAME - The name of the employee for whom orders should be retrieved.
   * @return {Promise<Array>} A Promise that resolves with an array of order objects retrieved from the database.
   */
  allOrdersByEmployee(EMPLOYEE_NAME) {
    const sql = "SELECT * FROM DELIVERY_ORDER WHERE EMPLOYEE_NAME = ?";
    const params = [EMPLOYEE_NAME];
    return this.database.queryAllData(sql, params);
  }

  /**
   * Inserts a new delivery order into the database.
   *
   * @param {string} timestamp - The timestamp of the order.
   * @param {string} employeeName - The name of the employee associated with the order.
   * @param {string} packageSize - The size of the package in the order.
   * @param {string} deliveryDate - The delivery date of the order.
   * @param {string} customDropoffPlace - The custom drop-off place for the order.
   * @param {number} storeID - The unique identifier of the store associated with the order.
   * @param {number} addressID - The unique identifier of the address associated with the order.
   * @return {Promise<number>} A Promise that resolves with the ID of the newly inserted order.
   */
  insertOrder(
    timestamp,
    employeeName,
    packageSize,
    deliveryDate,
    customDropoffPlace,
    storeID,
    addressID
  ) {
    const sql = `
    INSERT INTO
        DELIVERY_ORDER (timestamp, employeeName, packageSize, deliveryDate, customDropoffPlace, storeID, addressID)
    VALUES
        (?, ?, ?, ?, ?, ?, ?);
    `;
    const params = [
      timestamp,
      employeeName,
      packageSize,
      deliveryDate,
      customDropoffPlace,
      storeID,
      addressID
    ];
    return this.database.insertTuple(sql, params);
  }

  /**
   * Inserts handling information for a specific order into the database.
   *
   * @param {number} orderID - The unique identifier of the order for which handling information is being inserted.
   * @param {string} handlingInfo - The handling information to be inserted.
   * @return {Promise<number>} A Promise that resolves when the insertion is complete and returns the ID of the newly inserted handling information record.
   */
  insertHandlingInfo(orderID, handlingInfo) {
    const sql = `
    INSERT INTO
        HANDLINGINFO (orderID, handlingInfo)
    VALUES
        (?, ?);
    `;
    const params = [orderID, handlingInfo];
    return this.database.insertTuple(sql, params);
  }

  /**
   * Inserts recipient information for a specific order into the database.
   *
   * @param {number} orderID - The unique identifier of the order for which recipient information is being inserted.
   * @param {string} firstName - The first name of the recipient.
   * @param {string} lastName - The last name of the recipient.
   * @param {number} addressID - The unique identifier of the address associated with the recipient.
   * @return {Promise<number>} A Promise that resolves when the insertion is complete and returns the ID of the newly inserted recipient record.
   */
  insertRecipient(orderID, firstName, lastName, addressID) {
    const sql = `
    INSERT INTO
        RECIPIENT (orderID, firstName, lastName, addressID)
    VALUES
        (?, ?, ?, ?);
    `;
    const params = [orderID, firstName, lastName, addressID];
    return this.database.insertTuple(sql, params);
  }

  /**
   * Retrieves the order ID based on a set of criteria from the database.
   *
   * @param {string} timestamp - The timestamp of the order to be retrieved.
   * @param {string} employeeName - The name of the employee associated with the order.
   * @param {string} packageSize - The size of the package in the order.
   * @param {string} deliveryDate - The delivery date of the order.
   * @param {string} customDropoffPlace - The custom drop-off place for the order.
   * @param {number} storeID - The unique identifier of the store associated with the order.
   * @param {number} addressID - The unique identifier of the address associated with the order.
   * @return {Promise<number|null>} A Promise that resolves with the retrieved order ID or null if no matching order is found.
   */
  selectOrderID(
    timestamp,
    employeeName,
    packageSize,
    deliveryDate,
    customDropoffPlace,
    storeID,
    addressID
  ) {
    const sql = `
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
    const params = [
      timestamp,
      employeeName,
      packageSize,
      deliveryDate,
      customDropoffPlace,
      storeID,
      addressID
    ];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves all orders associated with a specific store from the database, including detailed information.
   *
   * @param {number} storeID - The unique identifier of the store for which orders should be retrieved.
   * @return {Promise<Array>} A Promise that resolves with an array of detailed order objects retrieved from the database.
   */
  selectAllOrdersOfStore(storeID) {
    const sql = `
    SELECT
        o.orderID AS orderID,
        o.timestamp AS timestamp,
        o.employeeName AS employeeName,
        o.packageSize AS packageSize,
        o.deliveryDate AS deliveryDate,
        o.customDropOffPlace AS customDropOffPlace,
        h.handlingInfo AS handlingInfo,
        r.firstName AS firstName,
        r.lastName AS lastName,
        a.street AS street,
        a.houseNumber AS houseNumber,
        z.ZIP AS zip
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
    const params = [storeID];
    return this.database.queryAllData(sql, params);
  }

  /**
   * Retrieves handling information associated with a specific order from the database.
   *
   * @param {number} orderID - The unique identifier of the order for which handling information should be retrieved.
   * @return {Promise<Object|null>} A Promise that resolves with the retrieved handling information object or null if no matching handling information is found.
   */
  selectHandlingInfo(orderID) {
    const sql = `
    SELECT
        *
    FROM 
        HANDLINGINFO
    WHERE
        orderID = ?;
    `;
    const params = [orderID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Retrieves recipient information associated with a specific order from the database.
   *
   * @param {number} orderID - The unique identifier of the order for which recipient information should be retrieved.
   * @return {Promise<Object|null>} A Promise that resolves with the retrieved recipient information object or null if no matching recipient information is found.
   */
  selectRecipient(orderID) {
    const sql = `
    SELECT 
        *
    FROM
        RECIPIENT
    WHERE
        orderID = ?;
    `;
    const params = [orderID];
    return this.database.queryOneDataSet(sql, params);
  }

  /**
   * Deletes a delivery order record from the database based on its order ID.
   *
   * @param {number} orderID - The unique identifier of the order to be deleted.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  deleteOrder(orderID) {
    const sql = "DELETE FROM ORDER WHERE ORDER_ID = ?";
    const params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  /**
   * Deletes handling information associated with a specific order from the database.
   *
   * @param {number} orderID - The unique identifier of the order for which handling information should be deleted.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  deleteHandlingInfo(orderID) {
    const sql = `
    SELECT
        *
    FROM
        HANDLING_INFO
    WHERE
        orderID = ?;
    `;
    const params = [orderID];
    return this.database.queryWithoutResponse(sql, params);
  }

  /**
   * Deletes recipient information based on first name and last name from the database.
   *
   * @param {string} firstname - The first name of the recipient to be deleted.
   * @param {string} lastname - The last name of the recipient to be deleted.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  deleteRecipient(firstname, lastname) {
    const sql = "DELETE FROM RECIPIENT WHERE firstname = ? AND lastname";
    const params = [firstname, lastname];
    return this.database.queryWithoutResponse(sql, params);
  }
}

module.exports = OrderRepository;
