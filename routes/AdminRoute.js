const express = require('express')
const dotenv = require('dotenv');
const router = express.Router();
const middlewares = require("../middlewares/middlewares");

// Set up Global configuration access
dotenv.config({ path: "../.env" });

// if the user has role "ROLE_ADMIN" it will allow to access else no access!
router.get("/manage", [middlewares.tokenAuthentication, middlewares.roleAuthentication('ROLE_ADMIN')],
    (req, res) => {
        res.json({
            auth: true,
            message: "Allowed for user with role ROLE_ADMIN",
            body: req.user
        })
    });


module.exports = router;