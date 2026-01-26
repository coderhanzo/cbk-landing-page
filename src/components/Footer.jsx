import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Follow CBK Beauty on Instagram"
    },
    {
      icon: FaFacebookF,
      href: "https://facebook.com",
      label: "Connect with CBK Beauty on Facebook"
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "Follow CBK Beauty on X"
    },
    {
      icon: MdEmail,
      href: "mailto:info@saloon.com",
      label: "Email CBK Beauty"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CBK Beauty
            </h3>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Luxury beauty salon in Accra offering premium hair, makeup, and beauty services. 
              Experience excellence in every detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/explore" className="hover:text-white transition-colors duration-200">Gallery</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="https://www.coloursbyk.com/" className="hover:text-white transition-colors duration-200">Shop</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-3">Connect with Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110 text-white"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs">
              © {currentYear} CBK Beauty. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}