import { Github } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-black text-gray-400 border-t border-gray-700 px-6 py-10 md:py-6">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-sm text-center md:text-left leading-relaxed">
					Built with ❤️ by{" "}
					<a
						href="https://github.com/AdityaVikramSingh45"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white underline underline-offset-4 hover:text-red-500 transition"
					>
						Aditya Vikram Singh
					</a>
					. View the source code on{" "}
					<a
						href="https://github.com/AdityaVikramSingh45"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-white underline underline-offset-4 hover:text-red-500 transition"
					>
						GitHub <Github size={16} />
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
