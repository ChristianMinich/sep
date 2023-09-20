/**
 * Class for geolocating coordinates based on an address using the Nominatim service.
 */
class GeoLocator {
  /**
   * Create a GeoLocator instance with the provided address components.
   * @param {string} houseNumber - The house number.
   * @param {string} street - The street name.
   * @param {string} zip - The ZIP code.
   */
  constructor(houseNumber, street, zip) {
    this.address =
      houseNumber +
      " " +
      street +
      " " +
      zip +
      " Lingen (Ems) Niedersachsen Germany";
    this.apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      this.address,
    )}`;
  }

  /**
   * Fetches the coordinates for the provided address.
   * @return {Promise<{ lat: string, lon: string }>} A promise that resolves with an object containing latitude and longitude.
   * @throws {Error} If there is an error during the fetch operation.
   */
  getCoordinates() {
    return fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          throw new Error("No coordinates found for the provided address.");
        }
        const coordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        console.log(coordinates);
        return coordinates;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

module.exports = GeoLocator;
