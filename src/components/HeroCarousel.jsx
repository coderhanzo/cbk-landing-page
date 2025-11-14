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
      if (prev.includes(index)) {
        return prev;
      }

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          onChange={handleSlideChange}
          className="h-full"
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-screen bg-black">
              {visibleIndices.includes(i) ? (
                <LazyImage
                  src={src}
                  alt={`Salon ${i + 1}`}
                  className="h-screen w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchpriority={i === 0 ? "high" : "auto"}
                  sizes="100vw"
                  observerMargin="320px"
                />
              ) : (
                <div className="h-full w-full bg-slate-800/60" aria-hidden />
              )}
            </div>
          ))}
        </Carousel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-4 flex w-full max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-white/60 bg-white/40 px-6 py-8 text-center shadow-[0_25px_70px_rgba(15,23,42,0.2)] backdrop-blur-2xl sm:mx-auto sm:bg-white/30 sm:px-8 sm:backdrop-blur-3xl md:p-16"
      >
        <p className="text-3xl font-semibold tracking-tight text-black drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)] sm:text-5xl sm:drop-shadow-none md:text-6xl">
          Experience Beauty Redefined
        </p>

        <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          <a
            href="https://www.coloursbyk.com/"
            className="rounded-full bg-black px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Shop Now
          </a>
          <a
            href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
            className="rounded-full bg-white px-6 py-2 font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Book Appointment
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
