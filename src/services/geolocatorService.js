const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "openstreetmap",
  language: "de",
};

function getCoordinates(address) {
  const geocoder = NodeGeocoder(options);
  return geocoder.geocode(address);
}

module.exports = { getCoordinates };
