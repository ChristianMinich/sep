const AbstractRepository = require('../../src/repositories/abstractRepository');

test("Initialization of AbstractModel expecting Error", () => {
    const abstractRepository = new AbstractRepository();
    expect(abstractRepository.database).toBe(undefined);
}); 