const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Env Variable
const env = require("dotenv").config({ path: "config/.env" });

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect Database
const dbConnect = require("./DB/database");
dbConnect();

// Routes
const userRoute = require("./Routes/UserRoute");
const courseRoute = require("./Routes/CourseRoute");

// Mount routes
app.use("/api/user", userRoute);
app.use("/api/v1", courseRoute);

// Live Server
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});

// Default Route
app.get("/", (req, res) => {
  res.send("Hello jee, Kaise ho saare");
});
