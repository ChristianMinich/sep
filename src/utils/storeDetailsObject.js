/**
 * Creates an object with structured information for a location.
 *
 * @param {string} id - The unique identifier for the location.
 * @param {string} name - The name of the location.
 * @param {string} owner - The owner of the location.
 * @param {string} street - The street name of the location's address.
 * @param {string} houseNumber - The house number of the location's address.
 * @param {string} zip - The ZIP code of the location's address.
 * @param {string} city - The city where the location is situated.
 * @param {string} telephone - The telephone number of the location.
 * @param {string} email - The email address of the location.
 * @param {string} logo - The logo URL or path for the location.
 * @param {string} backgroundImage - The background image URL or path for the location.
 * @param {number} longitude - The longitude coordinate of the location.
 * @param {number} latitude - The latitude coordinate of the location.
 * @function createObject
 *
 * @return {Object} An object with structured location information.
 */
function createObject(
  id,
  name,
  owner,
  street,
  houseNumber,
  zip,
  city,
  telephone,
  email,
  logo,
  backgroundImage,
  longitude,
  latitude,
) {
  return {
    id: id,
    name: name,
    owner: owner,
    address: {
      street: street,
      houseNumber: houseNumber,
      zip: zip,
      city: city,
    },
    telephone: telephone,
    email: email,
    logo: logo,
    backgroundImage: backgroundImage,
    coordinates: {
      latitude: latitude,
      longitude: longitude,
    },
  };
}

module.exports = { createObject };
