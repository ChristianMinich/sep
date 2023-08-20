
class GeoLocator{
    constructor(houseNumber, street, zip){
        this.address = houseNumber + " " + street + " " + zip + " Lingen (Ems) Niedersachsen Germany";
        this.apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.address)}`;
    }

    getCoordinates(){
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => {
                let coordinates = {
                    lat: data[0].lat,
                    lon: data[0].lon
                };
                console.log(coordinates);
                return coordinates;
            }
        );
    }
}