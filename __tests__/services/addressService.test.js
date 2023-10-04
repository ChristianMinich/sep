const AddressService = require("../../src/services/addressService");
const { UserRepository } = require("../../src/repositories/userRepository");

const mockLocator = {
  getCoordinates: jest.fn(),
};

jest.mock('../../src/services/locatorService', () => {
  return jest.fn().mockImplementation(() => mockLocator);
});

describe("AddressService", () => {
  let addressService;
  let mockDatabase;

  beforeAll(() => {
    // Create a mock database object with a selectZipID method
    mockDatabase = {
      selectZipID: jest.fn(),
      selectAddressID: jest.fn(),
      insertAddress: jest.fn(),
      addAddress: jest.fn(),
    };

    // Create an instance of AddressService with the mock database
    addressService = new AddressService(mockDatabase);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls after each test
  });

  test('should add an address with coordinates when recipient is not specified and address does not exist', async () => {
    // Arrange
    const street = 'Test Street';
    const houseNumber = '123';
    const zip = '12345';
    const zipID = '1';
  
    // Mock database to return null (address doesn't exist) for selectAddressID
    mockDatabase.selectAddressID.mockResolvedValue(null);
  
    // Mock Locator class to return coordinates
    const mockCoordinates = { lon: 1.23, lat: 4.56 };
    mockLocator.getCoordinates.mockResolvedValue(mockCoordinates);
  
    // Mock database to return true for insertAddress
    mockDatabase.insertAddress.mockResolvedValue(true);
  
    // Act
    const result = await addressService.addAddress(street, houseNumber, zip, zipID);
  
    // Assert
    expect(result).toBe(true);
    expect(mockDatabase.selectAddressID).toHaveBeenCalledWith(street, houseNumber, zipID);
    expect(mockLocator.getCoordinates).toHaveBeenCalledWith(houseNumber, street, zip);
    expect(mockDatabase.insertAddress).toHaveBeenCalledWith(street, houseNumber, mockCoordinates.lon, mockCoordinates.lat, zipID);
  });

  it("should return null if ZIPID is not found in the database", async () => {
    // Arrange
    const mockZip = "54321";

    // Mock the database's selectZipID method to return null (not found)
    mockDatabase.selectZipID.mockResolvedValue(null);

    // Act
    const result = await addressService.getZipID(mockZip);

    // Assert
    expect(result).toBeNull();
    expect(mockDatabase.selectZipID).toHaveBeenCalledWith(mockZip);
  });

  it("should return null and log an error on database error", async () => {
    // Arrange
    const mockZip = "99999";
    const mockError = new Error("Database error");

    // Mock the database's selectZipID method to throw an error
    mockDatabase.selectZipID.mockRejectedValue(mockError);

    // Act
    const result = await addressService.getZipID(mockZip);

    // Assert
    expect(result).toBeNull();
    expect(mockDatabase.selectZipID).toHaveBeenCalledWith(mockZip);

    // You can also add assertions for logging here if needed
  });
});
