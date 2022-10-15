// import essentials
const express = require('express');
const userRoute=require('./routes/UserRoute');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// use json handlers
app.use(express.json());

// user routes
app.use("/user",userRoute);


let PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});



