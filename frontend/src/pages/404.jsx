import { Link } from "react-router-dom";
import NetflixLogo from "../../public/assests/netflix-logo.png";
import ErrorImage from "../../public/assests/404.png"

const NotFoundPage = () => {
	return (
		<div
			className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
			style={{ backgroundImage: `url(${ErrorImage})` }}
		>
			{/* Overlay for better text visibility */}
			<div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

			{/* Navbar */}
			<header className="absolute top-0 left-0 w-full px-6 py-4 z-10 bg-gradient-to-b from-black via-transparent to-transparent">
				<Link to="/">
					<img src={NetflixLogo} alt="Netflix" className="h-10 sm:h-12" />
				</Link>
			</header>

			{/* Main Content */}
			<main className="relative z-10 text-center px-6 sm:px-12">
				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">Lost your way?</h1>
				<p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-xl mx-auto text-gray-300">
					Sorry, we can't find that page. But there's still so much to explore.
				</p>
				<Link
					to="/"
					className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition duration-200"
				>
					Return to Netflix Home
				</Link>
			</main>
		</div>
	);
};

export default NotFoundPage;
