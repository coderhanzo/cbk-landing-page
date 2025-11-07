import { motion } from "framer-motion";
import { useEffect } from "react";
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
  useEffect(() => {
    const preloadedImages = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      preloadedImages.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

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
        >
          {
            images.map((src, i) => (
              <div key={i}>
                <img
                  src={src}
                  alt={`Salon ${i + 1}`}
                  className="w-full h-screen object-cover"
                />
              </div>
            ))
          }
        </Carousel>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-white/20 bg-white/25 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:border-white/30 sm:bg-white/15 sm:backdrop-blur-2xl md:p-16"
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
