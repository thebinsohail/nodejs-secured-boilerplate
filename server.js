// import essentials
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes/');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// use json handlers
app.use(express.json());

// user routes
app.use("/user", routes.userRoute);

//admin routes
app.use("/admin", routes.adminRoute);

let PORT = process.env.PORT || 5000;

async function testConnection() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
}

// testing db connection
testConnection();

// start the server
let server=app.listen(PORT, async () => {

    console.log(`Server is up and running on ${PORT} ...`);
    await sequelize.sync({ force: true })
    console.log("Initialized Databased and Synced!");
});

// max timeout for all the requests to complete
server.timeout=1000


