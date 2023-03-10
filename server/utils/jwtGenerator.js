const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 3600});
}

module.exports = jwtGenerator