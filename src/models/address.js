const svc = require("../services");
class Address{
    constructor(
        street,
        houseNumber,
        zip,
    )
    {
        this._street = street !== null && street !== undefined && street !== "" ? street : this.throwError("street");
        this._houseNumber = houseNumber !== null && houseNumber !== undefined && houseNumber !== "" ? houseNumber : this.throwError("houseNumber");
        this._zip = zip !== null && zip !== undefined && zip !== "" ? zip : this.throwError("zip");
    }

    throwError(property) {
        throw new Error(`Missing property ${property}`);
      }

    updateAddress(storeID){
        return svc.addressService.newUpdateAddress(storeID, this);
    }

    get street(){
        return this._street;
    }

    set street(street){
        this._street = street;
    }

    get houseNumber(){
        return this._houseNumber;
    }

    set houseNumber(houseNumber){
        this._houseNumber = houseNumber;
    }

    get zip(){
        return this._zip;
    }

    set zip(zip){
        this._zip = zip;
    }
}

module.exports = Address;