const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../models");


// Set up Global configuration access
dotenv.config({ path: "../.env" });


router.post("/register", async (req, res) => {


    const { email, userName, password } = req.body;

    try {
        const Dbuser = await User.findOne({
            where: { email: req.body.email }
        })

        if (Dbuser == null) {
            const user = await User.create({ email, userName, password })
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
    const user = { username: username, password: password }

    const dbUser = await User.findOne({
        where: { userName: username, password: password }
    })


    if (dbUser) {
        const accessToken = generateAccessToken({ user: user });
        const refreshToken = generateRefreshToken({ user: user });
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
        const accessToken = generateAccessToken({user: user});
        res.json({ accessToken: accessToken });
    })

});

function generateAccessToken({ user }) {
    return jwt.sign({ user: user },
        process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

function generateRefreshToken({ user }) {
    return jwt.sign({ user: user },
        process.env.JWT_REFRESH_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {

            if (err) return res.sendStatus(403)

            req.user = user

            next();

        });

    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }

}

module.exports = router;