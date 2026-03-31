const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://raman:254011@cluster0.8dtrchj.mongodb.net/?appName=Cluster0S";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;