import React from "react";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useAuthStore } from "../../store/authUser";


const HomePage = ()=>{
    const {user} = useAuthStore();
    // console.log("user", user)
    return(
        <div>
           {
            // When not logged in then authScreen means for evryone
            user ? <HomeScreen/> : <AuthScreen/>
           }
        </div>
    )
}

export default HomePage;