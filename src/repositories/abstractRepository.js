/**
 * Abstract class for defining repositories.
 * @class AbstractRepository
 * @typedef {AbstractRepository}
 * @date 8/14/2023 - 3:32:26 PM
 */
class AbstractRepository {
  /**
   * Creates an instance of AbstractRepository.
   * @param {any} database - The database instance to be used by the repository.
   */
  constructor(database) {
    /**
     * The database instance used by the repository.
     * @type {any}
     */
    this.database = database;
  }
}

module.exports = AbstractRepository;
