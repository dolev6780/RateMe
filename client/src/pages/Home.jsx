import React, { useState } from 'react';
import MobileBottomBar from '../components/MobileBottomBar';
import AddPhotoPopUp from '../components/AddPhotoPopUp';
import { motion } from 'framer-motion';

const variants = {
  visible: { y: 0, transition: { duration: 0.5 } },
  hidden: { y: '100%', transition: { duration: 0.5 } }, // Change y value
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full relative">
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 w-full">
        <MobileBottomBar setIsOpen={setIsOpen} />
      </div>

      {/* Add Photo Popup */}
      <motion.div
        animate={isOpen ? "visible" : "hidden"}
        variants={variants}
        className="fixed bottom-0 w-full"
      >
        <AddPhotoPopUp setIsOpen={setIsOpen} />
      </motion.div>
    </div>
  );
}