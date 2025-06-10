import { motion } from "framer-motion";

export default function ExploreGallery() {
  const images = [
    "/src/assets/imgs/01.jpeg", 
    "/src/assets/imgs/02.jpeg", 
    "/src/assets/imgs/03.jpeg", 
    "/src/assets/imgs/04.jpeg", 
    "/src/assets/imgs/05.jpeg", 
    "/src/assets/imgs/06.jpeg", 
    "/src/assets/imgs/07.jpeg", 
    "/src/assets/imgs/08.jpeg", 
    "/src/assets/imgs/09.jpeg", 
    "/src/assets/imgs/10.jpeg", 
    "/src/assets/imgs/11.jpeg", 
    "/src/assets/imgs/12.jpeg",
    "/src/assets/imgs/13.jpeg",
    "/src/assets/imgs/14.jpg",
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 px-4 md:px-20 min-h-screen bg-black text-white"
    >
      <h2 className="text-3xl font-semibold text-center mb-10">Our Saloon & Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Work ${i + 1}`}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
          />
        ))}
      </div>
    </motion.section>
  );
}