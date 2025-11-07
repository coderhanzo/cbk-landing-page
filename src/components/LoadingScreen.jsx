import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const saloonName = "CBK Beauty";
  const words = `Welcome to ${saloonName}`.split(" ");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const displayDuration = words.length * 500 + 1000;
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
    }, 600);

    return () => clearTimeout(completionTimer);
  }, [isFadingOut, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-3xl font-bold text-white md:text-5xl"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 5,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="z-10 flex gap-3">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5 }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
