import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import HeroCarousel from './HeroCarousel';
import ExploreGallery from './ExploreGallery';
import ContactForm from './ContactForm';
import ComingSoon from './ComingSoon';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><HeroCarousel /></AnimatedPage>} />
        <Route path="/explore" element={<AnimatedPage><ExploreGallery /></AnimatedPage>} />
        {/* <Route path="/contact" element={<AnimatedPage><ContactForm /></AnimatedPage>} /> */}
        <Route path="/contact" element={<AnimatedPage><ComingSoon message="Our contact form is almost ready. Stay tuned!" /></AnimatedPage>}/>
      </Routes>
    </AnimatePresence>
  );
}