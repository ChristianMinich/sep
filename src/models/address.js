const svc = require("../services");
class Address{
    constructor(
        storeID,
        street,
        houseNumber,
        zip,
    )
    {
        this._storeID = storeID !== null && storeID !== undefined ? storeID : this.throwError("storeID");
        this._street = street !== null && street !== undefined ? street : this.throwError("street");
        this._houseNumber = houseNumber !== null && houseNumber !== undefined ? houseNumber : this.throwError("houseNumber");
        this._zip = zip !== null && zip !== undefined ? zip : this.throwError("zip");
    }

    throwError(property) {
        throw new Error(`Missing property ${property}`);
      }

    updateAddress(){
        return svc.addressService.newUpdateAddress(this);
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