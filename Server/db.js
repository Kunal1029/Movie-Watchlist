const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.q0d6jto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
