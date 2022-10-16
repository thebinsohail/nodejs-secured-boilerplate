const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../models");
const middlewares =require("../middlewares/middlewares");

// Set up Global configuration access
dotenv.config({ path: "../.env" });


module.exports=router;