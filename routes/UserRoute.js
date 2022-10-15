const express=require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const router=express.Router();

const posts = [
    {
        username: "anasbinsohail",
        title: "Docker Containers",
    },
    {
        username: "anasshafiq",
        title: "HTML CSS",
    },
    {
        username: "tahamir",
        title: "Spring Data JPA",
    }

];

// Set up Global configuration access
dotenv.config({path:"../.env"});


router.get("/posts", authenticateToken, ((req, res) => {
    res.json(posts.filter(post => post.username===req.user.username))
}));


router.post("/login", (req, res) => {

    const username = req.body.username
    const user={username:username}
    const accessToken = jwt.sign({ user: user}, process.env.JWT_ACCESS_TOKEN_SECRET)

    res.send({ accessToken: accessToken });

});


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