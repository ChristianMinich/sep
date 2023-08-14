

/**
 * Abstract class for defining repositories.
 * @date 8/14/2023 - 3:32:26 PM
 *
 * @class AbstractRepository
 * @typedef {AbstractRepository}
 */
class AbstractRepository{
    constructor(database){
        this.database = database;
    }
}

module.exports = AbstractRepository;