import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Footer from './components/Footer';
import LoadingScreen from './components/loadingscreen';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <nav className="flex justify-between items-center p-4 md:px-10 relative">
            <Link to="/" className="text-xl font-bold">SaloonLogo</Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm">
              <Link to="/explore">Explore Saloon</Link>
              <Link to="/contact">Contact Us</Link>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
                {menuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>

            {/* Mobile Nav Menu */}
            {menuOpen && (
              <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center text-sm gap-4 py-4 md:hidden z-50">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </div>
            )}
          </nav>

          <AnimatedRoutes />
          <Footer />
        </>
      )}
    </div>
  );
}