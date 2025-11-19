import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LazyImage from "./LazyImage";

const images = [
  "/imgs/15.JPG",
  "/imgs/16.JPG",
  "/imgs/17.JPG",
  "/imgs/18.JPG",
  "/imgs/19.JPG",
  "/imgs/20.JPG",
  "/imgs/21.JPG",
  "/imgs/22.JPG",
  "/imgs/23.JPG",
];

export default function HeroCarousel() {
  const [visibleIndices, setVisibleIndices] = useState([0, 1]);

  const revealIndex = useCallback((index) => {
    setVisibleIndices((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  }, []);

  const handleSlideChange = useCallback(
    (index) => {
      revealIndex(index);
      revealIndex((index + 1) % images.length);
    },
    [revealIndex]
  );

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          interval={5000}
          onChange={handleSlideChange}
          className="h-full"
          stopOnHover={false}
          swipeable={false}
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-full bg-gray-900">
              {visibleIndices.includes(i) ? (
                <LazyImage
                  src={src}
                  alt={`Salon ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchpriority={i === 0 ? "high" : "auto"}
                  sizes="100vw"
                  observerMargin="320px"
                />
              ) : (
                <div className="h-full w-full bg-gray-800/60 animate-pulse" />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-4 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Beauty
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience luxury beauty treatments in the heart of Accra
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.a
              href="https://www.coloursbyk.com/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-base shadow-xl shadow-black/25 hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto text-center"
            >
              Shop Products
            </motion.a>
            <motion.a
              href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-xl shadow-black/25 w-full sm:w-auto text-center"
            >
              Book Appointment
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}