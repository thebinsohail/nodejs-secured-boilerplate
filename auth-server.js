// import essentials
const express = require('express');
const { sequelize } = require('./models');
const userRoute = require('./routes/UserRoute');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// use json handlers
app.use(express.json());

// user routes
app.use("/user", userRoute);


let PORT = process.env.PORT || 5000;

async function main() {
    await sequelize.authenticate();
}

main();

// start the server
app.listen(PORT, async () => {
  
    console.log(`Server is up and running on ${PORT} ...`);
    await sequelize.sync({force:true})
    console.log("Initialized Databased and Synced!");
});



