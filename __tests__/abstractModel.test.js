const AbstractModel = require('../src/models/abstractModel');

test("Initialization of AbstractModel", () => {
    const abstractModel = new AbstractModel();
    expect(abstractModel.throwError).toThrow(Error);
});