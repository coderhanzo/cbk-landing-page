import { motion } from "framer-motion";
import { HiOutlineClock } from "react-icons/hi";

export default function ComingSoon({ message = "This page is under construction." }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        <HiOutlineClock className="text-5xl text-yellow-400 animate-pulse" />
        <h1 className="text-4xl font-bold">Coming Soon</h1>
        <p className="text-lg text-gray-300">{message}</p>
        <span className="text-sm text-gray-500">Stay tuned for updates.</span>
      </div>
    </motion.div>
  );
}