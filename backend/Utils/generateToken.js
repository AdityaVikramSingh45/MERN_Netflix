const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
        httpOnly: true, // makes it inaccessible to js, Prevents XSS attacks, as JavaScript running on the client cannot access it.
        sameSite: "lax", // prevents CSRF attacks
        secure: false  //process.env.NODE_ENV !== "development"
    });

    return token
}

// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// exports.generateTokenAndSetCookie = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

//     res.cookie("jwt-netflix", token, {
//         maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in ms
//         httpOnly: true,                    // inaccessible to JS, prevents XSS
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
//         secure: process.env.NODE_ENV === "production"  // only true in production (HTTPS)
//     });

//     return token;
// }
