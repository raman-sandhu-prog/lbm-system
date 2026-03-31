const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes");

const app = express();

// DB connection
connectDB();
app.use(express.static("public"));

app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));


app.use("/", authRoutes);

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});