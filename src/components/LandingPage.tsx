import { useState } from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import heroImage from "../assets/images/landing1.png";
import logo from "../assets/images/IpLogo.png";
import { Menu, X } from "lucide-react";
import EmailIcon from "@mui/icons-material/Email";

export function LandingPage() {
	const [email, setEmail] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email) {
			toast.error("Please enter your email address");
			return;
		}

		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		toast.success(
			"Successfully joined the waitlist! Check your inbox for updates."
		);
		setEmail("");
	};

	const handleScrollToWaitlist = () => {
		const waitlist = document.getElementById("waitlist");
		if (waitlist) {
			waitlist.scrollIntoView({ behavior: "smooth" });
		}
		setMenuOpen(false); // close mobile menu if open
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="bg-white px-6 lg:px-20 py-5 border-b border-gray-100 relative">
				<div className="max-w-[1400px] mx-auto flex items-center justify-between">
					{/* Logo */}
					<img src={logo} alt="iPrescribe" className="h-17" />

					{/* Desktop Nav */}
					<nav className="hidden md:flex items-center gap-12">
						<a
							href="#"
							className="text-black hover:text-[#2d4494] transition text-[15px]"
						>
							Home
						</a>
						<a
							href="#"
							className="text-black hover:text-[#2d4494] transition text-[15px]"
						>
							Features
						</a>
						<a
							href="#"
							className="text-black hover:text-[#2d4494] transition text-[15px]"
						>
							Contact us
						</a>
					</nav>

					{/* Join Waitlist Button (always visible) */}
					<button
						onClick={handleScrollToWaitlist}
						className="bg-[#2d4494] text-white px-7 py-2.5 rounded-full hover:bg-[#253a7a] transition text-[15px] font-medium"
					>
						Join Waitlist
					</button>

					{/* Mobile Hamburger */}
					<button
						className="md:hidden p-2 rounded-md border border-gray-300 ml-4 bg-[#c0cbf0] hover:bg-[#a8b8e0]"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						{menuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 p-6 z-50 transition-all duration-300 ${
						menuOpen
							? "max-h-screen opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}
				>
					<a
						href="#"
						className="text-black hover:text-[#2d4494]"
						onClick={() => setMenuOpen(false)}
					>
						Home
					</a>
					<a
						href="#"
						className="text-black hover:text-[#2d4494]"
						onClick={() => setMenuOpen(false)}
					>
						Features
					</a>
					<a
						href="#"
						className="text-black hover:text-[#2d4494]"
						onClick={() => setMenuOpen(false)}
					>
						Contact us
					</a>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-b from-white via-[#f0f2ff] to-[#e8ecff] py-10 md:py-20 lg:py-24">
				<div className="max-w-[1400px] mx-auto px-6 lg:px-20">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* Left Content */}
						<div className="flex flex-col items-center lg:items-start text-center lg:text-left md:pl-6">
							{/* Ready to explore banner */}
							<div className="inline-flex items-center gap-3 bg-[#c0cbf0] rounded-full px-5 py-2.5 shadow-sm mb-6 md:mb-8 text-[15px] whitespace-nowrap">
								<div className="flex -space-x-2">
									<div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
									<div className="w-6 h-6 rounded-full bg-orange-400 border-2 border-white"></div>
									<div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white"></div>
								</div>
								<span className="text-gray-700">
									Ready to explore iPrescribe?
								</span>
								<a
									href="#waitlist"
									className="text-[#2d4494] font-medium hover:underline flex items-center gap-1"
								>
									Join Waitlist
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										className="mt-0.5"
									>
										<path
											d="M6 12L10 8L6 4"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
							</div>

							{/* Main Heading */}
							<h1 className="text-[56px] leading-[1.1] font-bold text-gray-900 mb-6">
								Your Bridge
								<br />
								Between Care &<br />
								Convenience
							</h1>

							{/* Description */}
							<p className="text-gray-600 text-[17px] leading-relaxed mb-10 max-w-md">
								Schedule consultations, send or receive e-prescriptions, and
								manage medications from one secure platform.
							</p>

							{/* App Store Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<button className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition w-full sm:w-auto justify-center sm:justify-start">
									<svg
										className="w-7 h-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
									</svg>
									<div className="text-left">
										<div className="text-[11px] opacity-80">Coming Soon</div>
										<div className="font-semibold text-[15px]">Google Play</div>
									</div>
								</button>

								<button className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition w-full sm:w-auto justify-center sm:justify-start">
									<svg
										className="w-7 h-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
									</svg>
									<div className="text-left">
										<div className="text-[11px] opacity-80">Coming Soon</div>
										<div className="font-semibold text-[15px]">Appstore</div>
									</div>
								</button>
							</div>
						</div>

						{/* Right Content - Phone Mockups */}
						<div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
							<img
								src={heroImage}
								alt="iPrescribe app preview"
								className="w-full max-w-[700px] h-auto object-contain"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Waitlist Section */}
			<section id="waitlist" className="bg-[#2d4494] px-6 lg:px-20 py-24">
				<div className="max-w-[900px] mx-auto text-center">
					{/* Heading */}
					<h2 className="text-white text-[48px] font-bold mb-6">
						Join Our Waitlist
					</h2>

					{/* Description */}
					<p className="text-white/90 text-[17px] leading-relaxed mb-8 max-w-[700px] mx-auto break-words">
						Be the first to know about discounts, offers, and events weekly in
						your mailbox. Unsubscribe anytime.
					</p>

					{/* Form */}
					<form onSubmit={handleSubmit} className="w-full mx-auto px-0">
						<div className="relative rounded-full overflow-hidden bg-white/10 border border-white/20 flex items-center w-full max-w-[700px] mx-auto">
							{/* Email Icon */}
							<div className="absolute left-4 flex items-center h-full">
								<EmailIcon className="text-gray-400" />
							</div>

							{/* Input */}
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="flex-1 pl-12 pr-28 py-4 bg-transparent text-white placeholder:text-white/60 focus:outline-none text-[15px] rounded-full"
							/>

							{/* Submit Button */}
							<button
								type="submit"
								className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-3 bg-white text-[#2d4494] text-[15px] rounded-full hover:bg-gray-100 transition font-semibold"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[#2d4494] px-6 lg:px-20 py-12">
				{/* Border div */}
				<div className=" w-full max-w-[350] mx-auto border-t border-gray-300/10"></div>

				<div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
					{/* Logo */}
					<img
						src={logo}
						alt="iPrescribe"
						className="h-16 md:h-20 lg:h-24 brightness-0 invert"
					/>

					{/* Copyright */}
					<div className="text-white/80 text-[14px]">
						© 2025, All Rights Reserved
					</div>

					{/* Social Icons */}
					<div className="flex items-center gap-3">
						<a
							href="#"
							className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition text-[#2d4494]"
							aria-label="Facebook"
						>
							<Facebook size={18} />
						</a>
						<a
							href="#"
							className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition text-[#2d4494]"
							aria-label="Instagram"
						>
							<Instagram size={18} />
						</a>
						<a
							href="#"
							className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition text-[#2d4494]"
							aria-label="WhatsApp"
						>
							<MessageCircle size={18} />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
