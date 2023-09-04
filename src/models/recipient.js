class Recipient {
    constructor(firstName, lastName, address) {
        this._firstName = firstName !== null && firstName !== undefined ? firstName : this.throwError("firstName");
        this._lastName = lastName !== null && lastName !== undefined ? lastName : this.throwError("lastName");
        this._address = address !== null && address !== undefined ? address : this.throwError("address");
    }

    throwError(property) {
        throw new Error(`Missing property ${property}`);
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }
}

module.exports = Recipient;
