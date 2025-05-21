const express = require("express");
const authRoute = require("../backend/Routes/auth");
const movieRoute = require("../backend/Routes/movie")
const tvRoute = require("../backend/Routes/tvShow")
const searchRoute = require("../backend/Routes/search")
const cookieParser = require("cookie-parser");
const { protectRoute } = require("./middlwares/protectRoute");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config(); 

const dbConnect = require("./config/db");
dbConnect();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));


app.use(express.json()) // will allow to parse req.body
app.use(cookieParser());
 
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);


const PORT = process.env.PORT || 3001;

app.get("/", (req, res)=>{
    res.send("Home Page");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})