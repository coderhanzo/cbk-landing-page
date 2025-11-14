import { motion } from "framer-motion";
import LazyImage from "./LazyImage";

export default function ExploreGallery() {
  const images = [
    "/imgs/01.jpeg",
    "/imgs/02.jpeg",
    "/imgs/03.jpeg",
    "/imgs/04.jpeg",
    "/imgs/05.jpeg",
    "/imgs/06.jpeg",
    "/imgs/07.jpeg",
    "/imgs/08.jpeg",
    "/imgs/09.jpeg",
    "/imgs/10.jpeg",
    "/imgs/11.jpeg",
    "/imgs/12.JPEG",
    "/imgs/13.JPEG",
    "/imgs/14.JPG",
  ];

  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-6xl px-4 pt-10 pb-16 md:px-10"
      >
        <h2 className="mb-10 text-center text-3xl font-semibold text-slate-900">
          Our Saloon & Work
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="w-full overflow-hidden rounded-xl shadow-lg aspect-[4/5] sm:aspect-[3/4] lg:aspect-square"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
            >
              <LazyImage
                src={src}
                alt={`Work ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500"
                observerMargin="250px"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* <div>
        <div className=" grid grid-col-3text-black h-[15rem] w-[14rem] bg-gray-200 rounded-lg overflow-hidden shadow-lg object-cover">
          <img src={pic} alt="" />
          <img src={pic} alt="" />
          <img src={pic} alt="" />
          <img src={pic} alt="" />
        </div>
      </div> */}
    </div>
  );
}
