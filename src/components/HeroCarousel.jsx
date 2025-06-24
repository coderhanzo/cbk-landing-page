import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
            <img src="/src/assets/imgs/15.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/16.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/17.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/18.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/19.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/20.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/21.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/22.jpg" alt="Saloon 1" />
          </div>
          <div>
            <img src="/src/assets/imgs/23.jpg" alt="Saloon 1" />
          </div>
        </Carousel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className=" backdrop-blur-sm rounded-lg flex flex-col items-center py-[5rem] w-[65rem] justify-center text-white"
      >
        <p className="text-[4rem]">Experience Beauty Redefined</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://yourecommercesite.com"
            className=" text-white bg-black py-2 px-6 rounded-full hover:text-black hover:bg-white font-semibold"
          >
            Shop Now
          </a>
          <a
            href="https://bookingpage.com"
            className="bg-white text-black py-2 px-6 rounded-full hover:bg-black hover:text-white  font-semibold"
          >
            Book Appointment
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
