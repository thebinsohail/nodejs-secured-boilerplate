const express = require('express')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../models");

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
dotenv.config({ path: "../.env" });


router.get("/posts", authenticateToken, ((req, res) => {
    res.json(posts.filter(post => post.username === req.user.username))
}));

router.post("/register", async (req, res) => {

   
    const { email, userName, password } = req.body;

    try {
        const Dbuser=await User.findOne({
            where:{email:req.body.email}
        })

        if(Dbuser==null){
            const user=await User.create({ email, userName, password })
            return res.json(user);
        }

        else
            res.status(500).send(`User already exists with the email ${req.body.email}!`);
        
    } catch (error) {
          return res.status(500).send(error); 
    }

})

router.post("/login", async (req, res) => {

    const username = req.body.userName
    const password = req.body.password;
    const user = { username: username,password: password}
    
        const dbUser=await User.findOne({
            where:{userName:username,password:password}
        })


        if(dbUser){
            const accessToken = jwt.sign({ user: user }, process.env.JWT_ACCESS_TOKEN_SECRET)
            return res.status(200).send({ accessToken: accessToken });
        }

       return res.status(500).send({message:"User not Found!"}); 

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