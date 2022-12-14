const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../models");
const jwtUtil = require('../utils/JwtUtil');
const middlewares = require("../middlewares/middlewares");

// Set up Global configuration access
dotenv.config({ path: "../.env" });

// if the user has role "ROLE_USER" it will allow to access else no access!
router.get("/feed",
    [middlewares.tokenAuthentication,
    middlewares.roleAuthentication('ROLE_USER')],
    (req, res) => {
        res.json({
            auth: true,
            message: "allowed for user with role ROLE_USER",
            body: req.user
        });
    })


router.post("/register", async (req, res) => {


    const { email, userName, password, role } = req.body;

    try {
        const Dbuser = await User.findOne({
            where: { email: req.body.email }
        })

        if (Dbuser == null) {
            const user = await User.create({ email, userName, password, role })
            return res.json(user);
        }

        else
            res.status(500).send({
                error: "User already exists",
                message: "try using other credentials"
            });

    } catch (error) {
        return res.status(500).send(error);
    }

})

let refreshTokens = [];

router.post("/login", async (req, res) => {

    const username = req.body.userName
    const password = req.body.password;
    const role = req.body.role;
    const user = { username: username, password: password, role: role }
    const dbUser = await User.findOne({
        where: { userName: username, password: password, role: role }
    })


    if (dbUser) {

        const accessToken = jwtUtil.generateAccessToken({ user: user },'10m');
        const refreshToken = jwtUtil.generateRefreshToken({ user: user });

        refreshTokens.push(refreshToken);
        return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
    }

    return res.status(500).send({ error: "Unable to Authenticate User", message: "User not Found!" });

});


router.post('/token', (req, res) => {

    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401);

    if (!refreshTokens.includes(refreshToken)) return res.status(403);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(err);
        const accessToken = generateAccessToken({ user: user });
        res.json({ accessToken: accessToken });
    })

});



module.exports = router;