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
    <div className="min-h-screen text-slate-900">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Top Navbar */}
          <nav
            className={`relative mx-auto mt-6 flex items-center justify-between rounded-full border border-white/60 bg-white/80 px-6 py-4 shadow-lg backdrop-blur md:px-10 ${
              menuOpen ? 'w-[82%] max-w-4xl' : 'w-[92%] max-w-5xl'
            } transition-all duration-300 text-slate-900`}
          >
            <Link to="/" className="text-xl font-bold">CBK</Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm">
              <Link to="/explore" className="hover:underline">Explore Saloon</Link>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(true)} className="text-2xl text-slate-900">
                <HiMenu />
              </button>
            </div>
          </nav>

          {/* Blurred Overlay Background */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}

          {/* Right-Side Mobile Sidebar Menu */}
          <div
            className={`fixed top-0 right-0 z-50 h-fit min-h-[20%] w-[70%] max-w-xs transform rounded-l-3xl bg-slate-900/90 text-white shadow-xl backdrop-blur-md ${
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