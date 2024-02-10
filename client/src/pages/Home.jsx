import React, { useState, useLayoutEffect } from 'react';
import MobileBottomBar from '../components/MobileBottomBar';
import AddPhotoPopUp from '../components/AddPhotoPopUp';
import { motion } from "framer-motion";
import Feed from '../pages/Feed';
const variants = {
  visible: { y: 0, transition: { duration: 0.5 } },
  hidden: { y: '100%', transition: { duration: 0.5 } }, // Initial state is set to hidden
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    setIsOpen(false); // Set isOpen to false after the initial render
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div>
        <Feed/>
      </div>
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 w-full">
        <MobileBottomBar setIsOpen={setIsOpen} />
      </div>

      {/* Add Photo Popup */}
      <motion.div
        initial="hidden" // Ensure initial state matches the initial isOpen state
        animate={isOpen ? "visible" : "hidden"}
        variants={variants}
        className="fixed bottom-0 w-full"
      >
        <AddPhotoPopUp setIsOpen={setIsOpen} />
      </motion.div>
    </div>
  );
}
