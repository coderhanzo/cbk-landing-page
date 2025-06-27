import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-white min-h-screen">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Top Navbar */}
          <nav
            className={`relative flex justify-between items-center p-4 md:px-10 transition-all duration-300 ${
              menuOpen ? 'w-[75%]' : 'w-full'
            } text-black`}
          >
            <Link to="/" className="text-xl font-bold">CBK</Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm">
              <Link to="/explore" className="hover:underline">Explore Saloon</Link>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(true)} className="text-black text-2xl">
                <HiMenu />
              </button>
            </div>
          </nav>

          {/* Blurred Overlay Background */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}

          {/* Right-Side Mobile Sidebar Menu */}
          <div
            className={`fixed top-0 right-0 h-fit min-h-[20%] w-[40%] bg-black/80 backdrop-blur-md text-white z-50 rounded-l-xl shadow-xl transform ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              {/* <span className="text-lg font-semibold">Menu</span> */}
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                <HiX />
              </button>
            </div>

            <div className="flex flex-col px-6 py-6 gap-6 text-base font-medium">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/explore" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
                Explore Saloon
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Main Page Content */}
          <AnimatedRoutes />
          <Footer />
        </>
      )}
    </div>
  );
}