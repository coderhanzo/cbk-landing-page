import { motion } from "framer-motion";
// import pic from "../imgs/01.jpeg";

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
        // className="py-20 px-4 md:px-20 min-h-screen bg-black text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-10 text-black">
          Our Saloon & Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="w-full h-[40rem] overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
            >
              <img
                src={src}
                alt={`Work ${i + 1}`}
                className="w-full h-full object-cover transition-transform"
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
