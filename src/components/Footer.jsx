import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0 text-sm">&copy; 2025 Saloon. All rights reserved.</p>
        <div className="flex gap-4 text-xl">
          <a href="https://instagram.com"><FaInstagram /></a>
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="mailto:info@saloon.com"><MdEmail /></a>
        </div>
      </div>
    </footer>
  );
}