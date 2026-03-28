const mongoose = require("mongoose");

async function databaseConnection() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Database connection established successfully!");

    } catch (error) {
        console.log(`Something went wrong\n${error}`);
    }
}

module.exports = databaseConnection;