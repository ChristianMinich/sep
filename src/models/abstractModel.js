/**
 * An abstract base class for models.
 */
class AbstractModel {
  /**
   * Creates an instance of the AbstractModel class.
   * @constructor
   */
  constructor() {
    // The constructor is empty for an abstract class.
  }

  /**
   * Throws an error to indicate that this method should be implemented by subclasses.
   * @throws {Error} - Always throws an error with the message "Not implemented".
   */
  throwError() {
    throw new Error("Not implemented");
  }
}

module.exports = AbstractModel;
