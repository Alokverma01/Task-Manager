const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connection.on('connected' , () => console.log("database is connected"));
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB