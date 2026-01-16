import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { Memory } from '../types';

interface PolaroidCardProps {
  memory: Memory;
  onClose: () => void;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ memory, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`
          bg-white shadow-2xl relative overflow-hidden 
          w-full max-w-sm 
          /* Landscape & Tablet adaptations */
          md:max-w-4xl md:flex md:flex-row md:max-h-[85vh]
          landscape:max-w-4xl landscape:flex landscape:flex-row landscape:max-h-[90vh]
          rounded-sm
        `}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button - Positioned safely */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-full p-2 transition-colors z-50 shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div 
          className={`
            relative bg-gray-100 overflow-hidden cursor-pointer group
            w-full aspect-[4/5]
            /* Split layout for larger screens */
            md:w-5/12 md:h-full md:aspect-auto
            landscape:w-5/12 landscape:h-full landscape:aspect-auto
          `}
          onClick={() => setIsZoomed(!isZoomed)}
        >
             <motion.img 
                src={memory.image} 
                alt={memory.title}
                className="w-full h-full object-cover"
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                whileHover={{ scale: isZoomed ? 1.5 : 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
             />
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

             {/* Zoom Hint */}
             <div className="absolute bottom-3 right-3 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20 rounded-full p-1.5 backdrop-blur-md">
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
             </div>
        </div>

        {/* Content Section */}
        <div className={`
            p-6 md:p-10 landscape:p-8
            flex flex-col justify-center
            text-center md:text-left landscape:text-left
            md:w-7/12 landscape:w-7/12
            overflow-y-auto
        `}>
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline border-b border-stone-200 pb-3 gap-1">
               <span className="text-xs tracking-[0.2em] uppercase text-stone-400 font-sans">{memory.year}</span>
               <span className="text-sm italic text-stone-500 font-serif">{memory.city}</span>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
              {memory.title}
            </h3>
            
            <div className="flex justify-center md:justify-start landscape:justify-start">
               <span className="px-3 py-1 border border-stone-300 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-sans bg-stone-50">
                 #{memory.tag}
               </span>
            </div>

            <p className="text-base md:text-lg leading-loose text-stone-600 font-sans-body">
              {memory.story}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PolaroidCard;