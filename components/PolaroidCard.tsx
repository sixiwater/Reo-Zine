
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface PolaroidCardProps {
  memoryIndex: number;
  onClose: () => void;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ memoryIndex, onClose }) => {
  const { memories } = useContent();
  const memory = memories[memoryIndex];
  const [isZoomed, setIsZoomed] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);

  // If data is missing (e.g. index out of bounds), don't render
  if (!memory) return null;

  const currentStory = memory.stories[storyIndex];
  const displayImage = currentStory.image || memory.image;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (storyIndex < memory.stories.length - 1) {
      setStoryIndex(prev => prev + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (storyIndex > 0) {
      setStoryIndex(prev => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* 
         Card Container 
         - max-h: constrained to screen height minus padding (p-4 = 16px * 2 = 32px)
         - ensures 16px gap from edges at all times
      */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`
          bg-white shadow-2xl relative overflow-hidden rounded-sm flex flex-col md:flex-row
          w-full max-w-sm md:max-w-4xl 
          max-h-[calc(100vh-32px)]
          md:h-auto md:max-h-[85vh]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-full p-2 transition-colors z-50 shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div 
          className={`
            relative bg-gray-100 overflow-hidden cursor-pointer group flex-shrink-0
            w-full aspect-[4/3] md:w-5/12 md:h-auto md:aspect-auto
          `}
          onClick={() => setIsZoomed(!isZoomed)}
        >
             <motion.img 
                key={displayImage} // Re-animate on image change
                src={displayImage} 
                alt={memory.title}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
             />

             {/* Zoom Hint */}
             <div className="absolute bottom-3 right-3 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20 rounded-full p-1.5 backdrop-blur-md">
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
             </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col min-h-0 relative bg-white">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
              <div className="space-y-4 md:space-y-6 pb-12"> {/* Padding bottom for nav controls */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline border-b border-stone-200 pb-3 gap-1">
                   <span className="text-xs tracking-[0.2em] uppercase text-stone-400 font-sans flex gap-1 justify-center md:justify-start">
                      {memory.displayYear}
                   </span>
                   <span className="text-sm italic text-stone-500 font-serif text-center md:text-right">
                      {memory.city}
                   </span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 leading-tight text-center md:text-left">
                  {memory.title}
                </h3>
                
                <div className="flex justify-center md:justify-start">
                   <span className="px-3 py-1 border border-stone-300 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-sans bg-stone-50">
                     #{memory.tag}
                   </span>
                </div>

                <div className="relative min-h-[100px]">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={storyIndex}
                       initial={{ opacity: 0, x: 10 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -10 }}
                       transition={{ duration: 0.3 }}
                     >
                        <h4 className="font-bold text-lg mb-2 text-stone-800">{currentStory.title}</h4>
                        <p className="text-base md:text-lg leading-loose text-stone-600 font-sans-body whitespace-pre-wrap">
                          {currentStory.content}
                        </p>
                     </motion.div>
                   </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Story Navigation Footer (Fixed at bottom of content area) */}
            {memory.stories.length > 1 && (
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-stone-100 flex justify-between items-center z-10">
                    <button 
                      onClick={handlePrev}
                      disabled={storyIndex === 0}
                      className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 transition-colors text-stone-600"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <span className="text-xs font-sans tracking-widest text-stone-400">
                        {storyIndex + 1} / {memory.stories.length}
                    </span>

                    <button 
                      onClick={handleNext}
                      disabled={storyIndex === memory.stories.length - 1}
                      className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 transition-colors text-stone-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PolaroidCard;
