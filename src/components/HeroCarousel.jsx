import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images =[
"/imgs/15.JPG",
"/imgs/16.JPG",
"/imgs/17.JPG",
"/imgs/18.JPG",
"/imgs/19.JPG",
"/imgs/20.JPG",
"/imgs/21.JPG",
"/imgs/22.JPG",
"/imgs/23.JPG",
]

export default function HeroCarousel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-screen flex justify-center items-center overflow-hidden"
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
                alt={'Saloon ${15 + 1}'}
                className="w-full h-screen object-cover"
                />
              </div>
            ))
          }
        </Carousel>
      </div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  className="backdrop-blur-sm rounded-lg flex flex-col items-center py-[5rem] w-[65rem] justify-center text-white"
>
  <p className="text-[4rem] ml-4">Experience Beauty Redefined</p>

  <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
    <a
      href="https://www.coloursbyk.com/"
      className="text-white bg-black py-2 px-6 rounded-full hover:text-black hover:bg-white font-semibold"
    >
      Shop Now
    </a>
    <a
      href="https://www.fresha.com/a/cbk-beauty-flagship-salon-accra-agostinho-neto-road-umdarsv9"
      className="bg-white text-black py-2 px-6 rounded-full hover:bg-black hover:text-white font-semibold"
    >
      Book Appointment
    </a>
  </div>
</motion.div>
    </motion.section>
  );
}
