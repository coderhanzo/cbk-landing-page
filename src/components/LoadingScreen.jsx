import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const saloonName = "CBK Beauty";
  const words = `Welcome to ${saloonName}`.split(" ");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const displayDuration = words.length * 300 + 600; // Reduced duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, displayDuration);

    return () => clearTimeout(fadeTimer);
  }, [words.length]);

  useEffect(() => {
    if (!isFadingOut) {
      return undefined;
    }

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 400); // Faster fade out

    return () => clearTimeout(completionTimer);
  }, [isFadingOut, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }} // Faster transition
      className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-2xl font-bold text-white md:text-4xl"
    >
      {/* Reduced number of animated elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => ( // Reduced from 30 to 15
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20], // Reduced movement
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 3, // Faster animation
              delay: Math.random() * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="z-10 flex gap-2">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: i * 0.3, // Faster sequential appearance
              duration: 0.4 
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}