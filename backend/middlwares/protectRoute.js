const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/user");
dotenv.config();

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        // console.log("token", token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded", decoded)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");
        // console.log("user", user)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - User not found"
            });
        }

        req.user = user;
        // console.log("req.user", req.user)
        next();
    } 
    catch (error) {
        console.log("Error occurred during protectRoute:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};




// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../Models/user");
// dotenv.config();

// exports.protectRoute = async(req, res, next)=>{
//     try{
//         const token = req.cookies["jwt-netflix"];
//         // console.log("token", token)

//         if(!token){
//             return res.status(404).json({
//                 success: false,
//                 message: "Unauthorized - No token Provided"
//             })
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log("decoded", decoded)

//         if(!decoded){
//             return res.status(400).json({
//                 success: false,
//                 message: "Unauthorized - Invalid token"
//             })
//         }

//         const user = await User.findById(decoded.userId).select("-password");
//         // console.log("user", user)
//         if(!user){
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         req.user = user;
//         // console.log("req.user ", req.user)
//         next();
//     }
//     catch(error){
//         console.log("Error occured during protectedRoute", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server Error"
//             }
//         )
//     }
// }