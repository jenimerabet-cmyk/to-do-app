const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // this will print the error before exiting
  }
};

module.exports = connectDB;
