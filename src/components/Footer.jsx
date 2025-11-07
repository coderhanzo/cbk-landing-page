import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900/95 py-6 px-4 text-white shadow-inner md:px-20">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-slate-200">&copy; {new Date().getFullYear()} CBK Beauty. All rights reserved.</p>
        <div className="flex gap-4 text-xl text-slate-100">
          <a className="transition-opacity hover:opacity-70" href="https://instagram.com" aria-label="Follow CBK Beauty on Instagram">
            <FaInstagram />
          </a>
          <a className="transition-opacity hover:opacity-70" href="https://facebook.com" aria-label="Connect with CBK Beauty on Facebook">
            <FaFacebookF />
          </a>
          <a className="transition-opacity hover:opacity-70" href="https://twitter.com" aria-label="Follow CBK Beauty on X">
            <FaTwitter />
          </a>
          <a className="transition-opacity hover:opacity-70" href="mailto:info@saloon.com" aria-label="Email CBK Beauty">
            <MdEmail />
          </a>
        </div>
      </div>
    </footer>
  );
}