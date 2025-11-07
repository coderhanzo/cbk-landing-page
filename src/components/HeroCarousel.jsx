import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
  const [loaded, setLoaded] = useState(() => images.map(() => false));

  const markImageLoaded = useCallback((index) => {
    setLoaded((prev) => {
      if (prev[index]) {
        return prev;
      }

      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const preloadedImages = images.map((src, index) => {
      const img = new Image();
      const handleLoad = () => {
        if (isMounted) {
          markImageLoaded(index);
        }
      };

      img.addEventListener("load", handleLoad);
      img.src = src;
      return () => {
        img.removeEventListener("load", handleLoad);
        img.src = "";
      };
    });

    return () => {
      isMounted = false;
      preloadedImages.forEach((cleanup) => cleanup());
    };
  }, [markImageLoaded]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-[100dvh] flex justify-center items-center overflow-hidden px-4"
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          className="h-full"
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-screen">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-rose-100 to-amber-100 transition-opacity duration-500 ${loaded[i] ? "opacity-0" : "opacity-100 animate-pulse"}`}
              />
              <img
                src={src}
                alt={`Salon ${i + 1}`}
                loading="lazy"
                onLoad={() => markImageLoaded(i)}
                className={`h-screen w-full object-cover transition-opacity duration-700 ease-out ${loaded[i] ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          ))}
        </Carousel>
        <div
          className="absolute inset-0 bg-slate-900/40"
          aria-hidden="true"
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-[0_25px_70px_rgba(15,23,42,0.2)] backdrop-blur-2xl sm:bg-white/30 sm:backdrop-blur-3xl md:p-16"
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
