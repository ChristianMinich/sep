class GeoLocator {
  constructor(houseNumber, street, zip) {
    this.address =
      houseNumber +
      " " +
      street +
      " " +
      zip +
      " Lingen (Ems) Niedersachsen Germany";
    this.apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      this.address
    )}`;
  }

  getCoordinates() {
    return fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let coordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        console.log(coordinates);
        return coordinates; // Returning the coordinates object
      })
      .catch((error) => {
        console.error(error);
        throw error; // Rethrowing the error to maintain consistent error handling
      });
  }
}

module.exports = GeoLocator;
