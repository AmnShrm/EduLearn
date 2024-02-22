const express = require("express");
const app = express();

const env = require("dotenv").config({ path: "config/.env" });
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Connect Database
const dbConnect = require("./DB/database");
dbConnect();

// Routes
const userRoute = require("./Routes/UserRoute");

// Mount routes
app.use("/api/user", userRoute);

// Live Server
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});

// Default Route
app.get("/", (req, res) => {
  res.send("Hello jee, Kaise ho saare");
});