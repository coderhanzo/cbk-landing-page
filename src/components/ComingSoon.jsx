import { motion } from "framer-motion";
import { HiOutlineClock } from "react-icons/hi";

export default function ComingSoon({ message = "This page is under construction." }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-gray-50 to-white text-gray-900 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <HiOutlineClock className="text-4xl text-yellow-500 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold">Coming Soon</h1>
        <p className="text-base text-gray-600">{message}</p>
        <span className="text-sm text-gray-500">Stay tuned for updates.</span>
      </div>
    </motion.div>
  );
}