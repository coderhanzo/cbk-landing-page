import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ResponsiveImage from "./ResponsiveImage";

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

function HeroImageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="space-y-4">
          <div className="h-4 w-1/3 rounded-full bg-white/70" />
          <div className="h-4 w-2/5 rounded-full bg-white/50" />
        </div>
        <div className="space-y-3">
          <div className="h-2.5 w-full rounded-full bg-white/50" />
          <div className="h-2.5 w-5/6 rounded-full bg-white/40" />
          <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  const [visibleIndices, setVisibleIndices] = useState([0]);
  const [loadedIndices, setLoadedIndices] = useState(() => new Set());

  const handleImageLoad = useCallback((index) => {
    setLoadedIndices((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
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
      const nextIndex = (index + 1) % images.length;
      revealIndex(nextIndex);
    },
    [revealIndex]
  );

  return (
    <section className="relative m-0 flex h-[85svh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 md:h-[92vh]">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 h-full w-full">
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
          {images.map((src, i) => {
            const isVisible = visibleIndices.includes(i);
            const isLoaded = loadedIndices.has(i);

            return (
              <div key={i} className="relative h-full w-full overflow-hidden bg-gray-900">
                {!isLoaded && <HeroImageSkeleton />}
                {isVisible && (
                  <ResponsiveImage
                    imageKey={src}
                    alt={`Salon ${i + 1}`}
                    pictureClassName="absolute inset-0 h-full w-full"
                    className="h-full w-full object-cover object-center"
                    priority={i === 0}
                    sizes="100vw"
                    onLoad={() => handleImageLoad(i)}
                  />
                )}
                <div className="absolute inset-0 bg-black/25" />
              </div>
            );
          })}
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
