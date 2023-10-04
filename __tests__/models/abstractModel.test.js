const AbstractModel = require('../../src/models/abstractModel');

test("Initialization of AbstractModel expecting Error", () => {
    const abstractModel = new AbstractModel();
    expect(abstractModel.throwError).toThrow(Error);
}); 