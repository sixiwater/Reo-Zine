import React from 'react';
import { motion } from 'framer-motion';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#fdfbf7] relative p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-xl w-full border border-stone-800 p-8 md:p-12 relative"
      >
         {/* Decorative corners */}
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-800 -mt-1 -ml-1"></div>
         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-stone-800 -mt-1 -mr-1"></div>
         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-stone-800 -mb-1 -ml-1"></div>
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-800 -mb-1 -mr-1"></div>

        <h3 className="text-stone-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-sans">
          10 Year Anniversary
        </h3>
        
        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
          Echoes<br/><span className="italic font-light">of</span> Time
        </h1>

        <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-8"></div>

        <p className="text-stone-600 font-sans-body mb-10 leading-relaxed text-sm md:text-base">
          From Xixi Dormitory to the shores of Iceland. <br/>
          A decade of parallel climbing, distinct choices, <br/>
          and an unwavering witness to each other's lives.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-stone-900 text-stone-50 px-8 py-3 font-serif italic text-lg tracking-wide hover:bg-stone-800 transition-colors"
        >
          Start Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Landing;