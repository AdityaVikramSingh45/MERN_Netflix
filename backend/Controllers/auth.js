const User = require("../Models/user");
const bcryptjs = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../Utils/generateToken");

exports.signup = async(req, res)=>{
    try{
       const {userName, email, password} = req.body;

       if(!userName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
       }

       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

       if(!emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email"
        })
       }

       if(password.length < 6){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        })
       }

       const existingUserByEmail = await User.findOne({email: email});
       if(existingUserByEmail){
        return res.status(400).json({
            success: false, 
            message: "Email already exists"
        })
       }

       const existingUserByUserName = await User.findOne({userName: userName});
       if(existingUserByUserName){
        return res.status(400).json({
            success: false, 
            message: "userName already exists"
        })
       }

        //  A salt is a random string added to the password before hashing to make the hash unique, even if two users have the same password.
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password, salt)

       const PROFILE_PICS = ["/assests/avatar1.png", "/assests/avatar2.png", "/assests/avatar3.png"];

       const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

       const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword,
        image: image
       });

        const token = generateTokenAndSetCookie(newUser._id, res);
        console.log("Token in signup", token);
        await newUser.save();
        console.log("New user", newUser);
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser
        })
       
    }
    catch(error){
        console.log("Error occurred during Signup", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.logout = async(req, res)=>{
    try{
        res.clearCookie("jwt-netflix", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    catch(error){
        console.log("Error occurred during logout", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter both email and password"
            })
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = generateTokenAndSetCookie(user._id, res);
        console.log("Token from signUp", token);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
            user: user
        })
    }
    catch(error){
        console.log("Error occurred during login", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.authCheck = async(req, res)=>{
    try{
        // console.log("Inside authCHECK", req.user)
        res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch(error){
        console.log("Error in authCheck", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}