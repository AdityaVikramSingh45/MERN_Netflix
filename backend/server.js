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

// Load environment variables
dotenv.config();

// DB & env config
const dbConnect = require("./config/db");
dbConnect();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://mern-netflix-aawq.onrender.com"],
  credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Fallback for any route (like /watch/:id) to handle frontend routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
