/**
 * This Function return True if the E-Mail is valid and is not Else
 * @param {*} email
 * @returns {Boolean}
 */
function ValidateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email != null && email.match(mailformat)) {
        return true;
    }
    else{
        return false;
    }
}

module.exports = { ValidateEmail };