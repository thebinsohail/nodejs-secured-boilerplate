// import essentials
const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const app = express();

// use json handlers
app.use(express.json());


// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/user/login", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    const user = {
        userId: crypto.randomBytes(16).toString("hex"),
        userName: req.body.userName,
        password: req.body.password,
        role: ["ROLE_END_USER", "ROLE_CUSTOMER"],
        privileges: ["ORDER_ITEM", "BROWSE_ITEM", "RATE_ITEM"]
    };

    console.log(user)

    // get the secret key
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt
        .sign(
            { id: user.userId, userName: user.userName, role: user.role, privileges: user.privileges },
            jwtSecretKey,
            { expiresIn: 1800000 });

    res.send({token:token});
});

// Verification of JWT
app.get("/user/verify", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
