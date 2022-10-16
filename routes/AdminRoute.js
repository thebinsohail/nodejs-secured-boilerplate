const express = require('express')
const dotenv = require('dotenv');
const router = express.Router();
const middlewares = require("../middlewares/middlewares");
const { User } = require("../models");

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

// ADMIN CAN DELETE THE USER
router.delete("/delete/user", [middlewares.tokenAuthentication, middlewares.roleAuthentication('ROLE_ADMIN')],
    (req, res) => {

        try {
            User.destroy(
                { where: { email: req.body.email }, force: true },
            ).then((recordDeleted) => {
                if (recordDeleted === 1) {
                    res.json({ message: 'User deleted successfully!' });
                }
                else {
                    res.status(404).send({ message: 'User not found!' });
                }
            });

        } catch (error) {
            res.status(500).json({ message: error });
        }

    });





module.exports = router;