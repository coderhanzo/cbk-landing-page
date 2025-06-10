
// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// const pageVariants = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
// };

// function LoadingScreen({ onComplete }) {
//   const saloonName = "Glow & Grace";
//   const words = `Welcome to ${saloonName}`.split(" ");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onComplete();
//     }, words.length * 500 + 1000);
//     return () => clearTimeout(timer);
//   }, [onComplete, words.length]);

//   return (
//     <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white text-3xl md:text-5xl font-bold overflow-hidden">
//       {/* Background floating particles */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <motion.span
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full opacity-10"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`
//             }}
//             animate={{
//               y: [0, -40],
//               opacity: [0.1, 0.4, 0.1]
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 5 + Math.random() * 5,
//               delay: Math.random() * 2,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated text */}
//       <div className="z-10 flex gap-3">
//         {words.map((word, i) => (
//           <motion.span
//             key={i}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.5 }}
//           >
//             {word}
//           </motion.span>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-black border-t border-gray-800 py-6 px-4 md:px-20">
//       <div className="flex flex-col md:flex-row justify-between items-center">
//         <p className="mb-4 md:mb-0 text-sm">&copy; 2025 Saloon. All rights reserved.</p>
//         <div className="flex gap-4 text-xl">
//           <a href="https://instagram.com"><FaInstagram /></a>
//           <a href="https://facebook.com"><FaFacebookF /></a>
//           <a href="https://twitter.com"><FaTwitter /></a>
//           <a href="mailto:info@saloon.com"><MdEmail /></a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function Home() {
//   return (
//     <motion.section
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
//     >
//       <div className="absolute top-0 left-0 w-full h-full -z-10">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           interval={4000}
//         >
//           <div><img src="/saloon1.jpg" alt="Saloon 1" /></div>
//           <div><img src="/saloon2.jpg" alt="Saloon 2" /></div>
//           <div><img src="/saloon3.jpg" alt="Saloon 3" /></div>
//         </Carousel>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center backdrop-blur-md p-6 rounded-xl"
//       >
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Experience Beauty Redefined
//         </h1>
//         <p className="mb-6 text-lg md:text-xl">
//           Your journey to elegance starts here.
//         </p>
//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <a
//             href="https://yourecommercesite.com"
//             className="bg-white text-black py-2 px-6 rounded-full text-sm font-semibold"
//           >
//             Shop Now
//           </a>
//           <a
//             href="https://bookingpage.com"
//             className="bg-white text-black py-2 px-6 rounded-full text-sm font-semibold"
//           >
//             Book Appointment
//           </a>
//         </div>
//       </motion.div>
//     </motion.section>
//   );
// }

// function Explore() {
//   return (
//     <motion.section
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="py-20 px-4 md:px-20 min-h-screen bg-black text-white"
//     >
//       <h2 className="text-3xl font-semibold text-center mb-10">
//         Our Saloon & Work
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {["/style1.jpg", "/style2.jpg", "/style3.jpg"].map((src, i) => (
//           <motion.img
//             key={i}
//             src={src}
//             alt={`Work ${i + 1}`}
//             className="rounded-lg shadow-lg hover:scale-105 transition-transform"
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: i * 0.2, duration: 0.4 }}
//           />
//         ))}
//       </div>
//     </motion.section>
//   );
// }

// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("https://formspree.io/f/yourFormID", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//   };

//   return (
//     <motion.section
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="bg-gray-900 text-white py-16 px-4 md:px-20 min-h-screen"
//     >
//       <h2 className="text-2xl font-semibold text-center mb-8">Contact Us</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-xl mx-auto flex flex-col gap-4"
//       >
//         <div className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             required
//             value={form.name}
//             onChange={handleInputChange}
//             className="p-3 rounded bg-gray-800 w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             required
//             value={form.email}
//             onChange={handleInputChange}
//             className="p-3 rounded bg-gray-800 w-full"
//           />
//         </div>
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           required
//           value={form.message}
//           onChange={handleInputChange}
//           className="p-3 rounded bg-gray-800 h-32"
//         />
//         <button
//           type="submit"
//           className="bg-white text-black py-2 px-6 rounded-full text-sm font-semibold self-start"
//         >
//           Send Message
//         </button>
//       </form>
//     </motion.section>
//   );
// }

// function AnimatedRoutes() {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<Home />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// export default function LandingPage() {
//   const [showLoader, setShowLoader] = useState(true);

//   return (
//     <Router>
//       <div className="bg-black text-white min-h-screen">
//         {showLoader ? (
//           <LoadingScreen onComplete={() => setShowLoader(false)} />
//         ) : (
//           <>
//             <nav className="flex justify-between items-center p-4 md:px-10">
//               <Link to="/" className="text-xl font-bold">SaloonLogo</Link>
//               <div className="hidden md:flex gap-6 text-sm">
//                 <Link to="/explore">Explore Saloon</Link>
//                 <Link to="/contact">Contact Us</Link>
//               </div>
//             </nav>
//             <AnimatedRoutes />
//             <Footer />
//           </>
//         )}
//       </div>
//     </Router>
//   );
// }
