const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Set up Global configuration access
dotenv.config({ path: "../.env" });

module.exports = {
    generateAccessToken: function ({ user },expiryTime) {
        return jwt.sign({ user: user },
            process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
    },

    generateRefreshToken: function ({ user }) {
        return jwt.sign({ user: user },
            process.env.JWT_REFRESH_TOKEN_SECRET);
    }

}