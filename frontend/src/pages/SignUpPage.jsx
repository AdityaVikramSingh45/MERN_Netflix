import React, { useState } from "react";
import { Link } from "react-router-dom";
import NetflixLogo from "../../public/assests/netflix-logo.png"
import { useAuthStore } from "../store/authUser";

const SignUpPage = ()=>{

   // useParams() from react-router-dom only works for path parameters, not query parameters.
   //  Path parameters are parts of the URL path like this: /signup/:email

   //  query parameter: query string (after the ?).
   // /signup?email=abc@gmail.com   

   const {signup} = useAuthStore()

    const {searchParams} = new URL(document.location);
    const emailValue = searchParams.get("email");

    const [email, setEmail] = useState(emailValue || "");
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("");

    const handleSignUp = (e) =>{
        e.preventDefault();
        console.log(email, userName, password)
        signup({email, userName, password});
    }

    return(
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4 ">
                <Link to={"/"}>
                    <img src = {NetflixLogo} alt="logo" className="w-52"/>
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    {/* SignUp title */}
                    <h1 className="text-white text-center text-2xl font-bold mb-4">
                        Sign Up
                    </h1>

                    {/* form */}
                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                                Email
                            </label>
                            <input type="email"
                            placeholder="you@gmail.com"
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-transparent text-white focus:outline-none focus:ring"
                            id="email"
                            // value binds the input value to a state variable email. Makes the component a controlled component in React.
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="userName" className="text-sm font-medium text-gray-300 block">
                            userName
                            </label>
                            <input type="text"
                            placeholder="johndoe"
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-transparent text-white focus:outline-none focus:ring"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                                Password
                            </label>
                            <input type="password"
                            placeholder="*********"
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-transparent text-white focus:outline-none focus:ring"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 ">
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center text-gray-400">
                        Already a member?{" "}
                        <Link to={"/login"} className="text-red-500 hover:underline">
                           Sign in 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;