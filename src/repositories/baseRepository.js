import AbstractRepository from './abstractRepository.js';
class BaseRepository extends AbstractRepository{
    constructor(database) {
      super(database);
    }
  
    query(sql, params) {
      return new Promise((resolve, reject) => {
        this.database.getConnection()
          .then(conn => {
            conn.query(sql, params)
              .then(result => {
                conn.release();
                resolve(result);
              })
              .catch(error => {
                console.log(error);
                conn.release();
                reject(error);
              });
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  
    queryOneDataSet(sql, params) {
      return this.query(sql, params)
        .then(result => (result.length !== 0) ? result[0] : false);
    }
  
    queryAllData(sql, params) {
      return this.query(sql, params)
        .then(result => (result.length !== 0) ? result : false);
    }
  
    queryWithoutResponse(sql, params) {
      return this.query(sql, params)
        .then(result => !!result);
    }
  
    updateTable(sql, params) {
      return this.query(sql, params)
        .then(result => result.affectedRows > 0);
    }
  
    insertTuple(sql, params) {
      return this.query(sql, params)
        .then(result => result.affectedRows > 0);
    }
  }
  
  module.exports = BaseRepository;
  