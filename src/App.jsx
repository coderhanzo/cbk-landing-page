import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Fixed Navigation */}
          <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-black/5">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                {/* Logo */}
                <Link 
                  to="/" 
                  className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                >
                  CBK Beauty
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                        location.pathname === item.path 
                          ? 'text-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                  <a
                    href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
                    className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg shadow-gray-900/20"
                  >
                    Book Now
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <HiMenu className="text-lg text-gray-700" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              />
              
              {/* Slide-in Menu */}
              <div className="absolute top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <span className="text-base font-semibold text-gray-900">Menu</span>
                    <button 
                      onClick={() => setMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <HiX className="text-lg text-gray-600" />
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            location.pathname === item.path
                              ? 'bg-gray-900 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-4 border-t border-gray-100">
                    <a
                      href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
                      className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg text-center text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg block"
                    >
                      Book Appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content with proper spacing */}
          <div className="pt-20">
            <AnimatedRoutes />
          </div>
          
          <Footer />
        </>
      )}
    </div>
  );
}