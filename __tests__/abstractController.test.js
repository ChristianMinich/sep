const AbstractController = require('../src/controllers/abstractController');

test("Initialization of AbstractController", () => {
    const abstractController = new AbstractController();
    expect(abstractController).toBeInstanceOf(AbstractController);
});