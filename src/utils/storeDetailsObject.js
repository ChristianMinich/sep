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
  latitude
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
