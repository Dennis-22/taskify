const crypto = require("crypto");

function generateRandomId(){
    return crypto.randomBytes(16).toString("hex")
}

module.exports = {generateRandomId}