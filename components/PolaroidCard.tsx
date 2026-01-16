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
      initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white p-4 pb-8 shadow-2xl max-w-sm w-full relative transform rotate-1"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-stone-900 text-white rounded-full p-2 hover:bg-stone-700 transition-colors shadow-lg z-50"
        >
          <X size={16} />
        </button>

        {/* Image Container */}
        <div 
          className="aspect-[4/5] w-full bg-gray-100 mb-4 overflow-hidden relative border border-gray-200 group cursor-pointer"
          onClick={() => setIsZoomed(!isZoomed)}
        >
             <motion.img 
                src={memory.image} 
                alt={memory.title}
                className="w-full h-full object-cover"
                animate={{ scale: isZoomed ? 2 : 1 }}
                whileHover={{ scale: isZoomed ? 2 : 1.1 }}
                transition={{ duration: 0.4 }}
             />
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

             {/* Zoom Hint Icon */}
             <div className="absolute bottom-2 right-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20 rounded-full p-1 backdrop-blur-sm">
                {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
             </div>
        </div>

        <div className="text-center space-y-2 font-serif text-stone-800">
          <div className="flex justify-between items-end border-b border-stone-200 pb-2 mb-3">
             <span className="text-xs tracking-widest uppercase text-stone-500 font-sans">{memory.year}</span>
             <span className="text-xs italic text-stone-400 font-sans">{memory.city}</span>
          </div>
          
          <h3 className="text-xl font-bold leading-tight">{memory.title}</h3>
          
          <div className="flex justify-center py-2">
             <span className="px-2 py-0.5 border border-stone-300 rounded-full text-[10px] uppercase tracking-wider text-stone-500 font-sans">
               {memory.tag}
             </span>
          </div>

          <p className="text-sm leading-relaxed text-stone-600 font-sans-body px-2">
            {memory.story}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PolaroidCard;