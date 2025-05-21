import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NetflixLogo from "../../public/assests/netflix-logo.png"
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import image from "../../public/assests/avatar1.png"
import { useContentStore } from "../store/content";

const Navbar = ()=>{

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {user, logout} = useAuthStore();
    
    const { setContentType } = useContentStore();

    // useEffect(()=>{
    //     console.log("contentType:", contentType);
    // }, [contentType])

    const toggleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return(
        <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">

            <div className="flex items-center gap-10 z-50">
                <Link to={"/"}>
                   <img src={NetflixLogo} alt="Netflix-logo" className="w-32 sm:w-40"/>
                </Link>

                {/* Desktop navbar items */}
            {/* Hidden for lessd than small screen and only for desktop view >=small */}
            <div className="hidden sm:flex gap-2 items-center">
                <Link to={"/"} className="hover:underline" onClick={() => setContentType("movie")}>
                   Movies
                </Link>

                <Link to={"/"} className="hover:underline" onClick={() => setContentType("tv")}>
                   Tv Shows
                </Link>

                <Link to={"/history"} className="hover:underline">
                   Search History
                </Link>
            </div>
            </div>

            <div className="flex gap-2 items-center z-50">
                <Link to={"/search"}>
                   <Search className="size-6 cursor-pointer"/>
                </Link>
                <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer"/>
                <LogOut className="size-6 cursor-pointer" onClick={logout}/>

                <div className="sm:hidden">
                    <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu}/>
                </div>
            </div>

            {/* Mobile navabr items */}
            {
                isMobileMenuOpen && (
                    // sm:hidden	Hides the element on small (sm) screens and above (≥640px).
                    <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border-gray-800">

                        <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                           Movies
                        </Link>

                        <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                           Tv Shows
                        </Link>

                        <Link to={"/history"} className="block hover:underline p-2" onClick={toggleMobileMenu}>
                           Search History
                        </Link>

                    </div>
                )
            }


        </header>
    )
}

export default Navbar