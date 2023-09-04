const svc = require('../services');

class Settings {
    constructor(storeID, parameter, value) {
        this._storeID = storeID !== null && storeID !== undefined && storeID !== "" ? storeID : this.throwError("storeID");
        this._parameter = parameter !== null && parameter !== undefined && parameter !== "" ? parameter : this.throwError("parameter");
        this._value = value !== null && value !== undefined && value !== "" ? value : this.throwError("value");
    }

    throwError(property) {
        throw new Error(`Missing property ${property}`);
    }

    updateParameter() {
        return svc.storeService.updateParameters(this);
    }

    // Function for changing logo and background image.

    get storeID() {
        return this._storeID;
    }

    set storeID(storeID) {
        this._storeID = storeID;
    }

    get parameter() {
        return this._parameter;
    }

    set parameter(parameter) {
        this._parameter = parameter;
    }
}

module.exports = Settings;
