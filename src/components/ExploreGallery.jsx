import { motion } from "framer-motion";
import LazyImage from "./LazyImage";

export default function ExploreGallery() {
  const images = [
    "/imgs/01.jpeg", "/imgs/02.jpeg", "/imgs/03.jpeg", "/imgs/04.jpeg",
    "/imgs/05.jpeg", "/imgs/06.jpeg", "/imgs/07.jpeg", "/imgs/08.jpeg",
    "/imgs/09.jpeg", "/imgs/10.jpeg", "/imgs/11.jpeg", "/imgs/12.JPEG",
    "/imgs/13.JPEG", "/imgs/14.JPG",
  ];

  // Prioritize first row of images
  const prioritizedImages = images.map((src, index) => ({
    src,
    priority: index < 6, // First 6 images get higher priority
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Faster stagger
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Faster animation
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }} // Faster
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Salon & Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our luxurious salon environment and the exceptional work we create
          </p>
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {prioritizedImages.map(({ src, priority }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[3/4]"
            >
              <LazyImage
                src={src}
                alt={`Salon work ${i + 1}`}
                loading={priority ? "eager" : "lazy"}
                fetchpriority={priority ? "high" : "auto"}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                observerMargin="50px" // Reduced margin
                staticRender
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to experience our services?</p>
          <a
            href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Your Appointment
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
