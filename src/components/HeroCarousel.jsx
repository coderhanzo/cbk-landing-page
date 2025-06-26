import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img15 from "../assets/imgs/15.jpg";
import img16 from "../assets/imgs/16.jpg";

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
          <div>
            <img src={img15} alt="Saloon 15" />
          </div>
          <div>
            <img src={img16} alt="Saloon 16" />
          </div>
          <div>
            <img src="/src/assets/imgs/17.jpg" alt="Saloon 17" />
          </div>
          <div>
            <img src="/src/assets/imgs/18.jpg" alt="Saloon 18" />
          </div>
          <div>
            <img src="/src/assets/imgs/19.jpg" alt="Saloon 19" />
          </div>
          <div>
            <img src="/src/assets/imgs/20.jpg" alt="Saloon 20" />
          </div>
          <div>
            <img src="/src/assets/imgs/21.jpg" alt="Saloon 21" />
          </div>
          <div>
            <img src="/src/assets/imgs/22.jpg" alt="Saloon 22" />
          </div>
          <div>
            <img src="/src/assets/imgs/23.jpg" alt="Saloon 23" />
          </div>
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
