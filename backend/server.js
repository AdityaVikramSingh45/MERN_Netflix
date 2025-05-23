const express = require("express");
const authRoute = require("../backend/Routes/auth");
const movieRoute = require("../backend/Routes/movie");
const tvRoute = require("../backend/Routes/tvShow");
const searchRoute = require("../backend/Routes/search");
const cookieParser = require("cookie-parser");
const { protectRoute } = require("./middlwares/protectRoute");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const ENV_VARS = require("../backend/config/envVars");
const dbConnect = require("./config/db");
dbConnect();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://mern-netflix-aawq.onrender.com"],
  credentials: true
}));


app.use(express.json()); // to parse JSON request bodies
app.use(cookieParser());

// Serve static files from React frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
