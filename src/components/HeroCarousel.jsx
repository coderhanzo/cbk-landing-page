import { motion } from "framer-motion";
import { useCallback, useState, useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LazyImage from "./LazyImage";
import { preloadImages } from "../utils/imageUtils";

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

  // Preload critical images on component mount
  useMemo(() => {
    preloadImages(images.slice(0, 2));
  }, []);

  const revealIndex = useCallback((index) => {
    setVisibleIndices((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  }, []);

  const handleSlideChange = useCallback(
    (index) => {
      revealIndex(index);
      // Preload next image
      const nextIndex = (index + 1) % images.length;
      if (!visibleIndices.includes(nextIndex)) {
        const img = new Image();
        img.src = images[nextIndex];
      }
      revealIndex(nextIndex);
    },
    [revealIndex, visibleIndices]
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
          swipeable={true}
          transitionTime={400}
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-full bg-gray-900">
              {visibleIndices.includes(i) ? (
                <LazyImage
                  src={src}
                  alt={`Salon ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchpriority={i === 0 ? "high" : "auto"}
                  sizes="100vw"
                  observerMargin="100px"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-4 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-lg">Beauty</span>
            <br />
            <span className="text-gray-100 drop-shadow-lg">Redefined</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Experience luxury beauty treatments in the heart of Accra
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://www.coloursbyk.com/"
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-base shadow-xl shadow-black/25 hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto text-center"
            >
              Shop Products
            </a>
            <a
              href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-xl shadow-black/25 w-full sm:w-auto text-center"
            >
              Book Appointment
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}