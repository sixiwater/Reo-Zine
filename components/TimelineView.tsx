
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Memory } from '../types';

// Extracted Component for Section Logic (Carousel)
// Defined before TimelineView to satisfy linter rules about use-before-define
const TimelineSection: React.FC<{
    memory: Memory, 
    bgClass: string, 
    textMuted: string,
    isFirst: boolean
}> = ({ memory, bgClass, textMuted, isFirst }) => {
    const [storyIndex, setStoryIndex] = useState(0);
    const currentStory = memory.stories[storyIndex];
    const displayImage = currentStory.image || memory.image;

    return (
        <section 
            id={`memory-${memory.year}`}
            className={`w-full h-full snap-start flex flex-col md:flex-row items-center justify-center p-6 relative ${bgClass} transition-colors duration-700`}
        >
            {/* Text Content */}
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className="w-full md:w-1/2 max-w-lg z-10 flex flex-col justify-center order-2 md:order-1 mt-6 md:mt-0"
            >
            <div className={`text-xs font-bold tracking-[0.2em] mb-4 uppercase ${textMuted} font-sans flex gap-2`}>
                <span>{memory.displayYear}</span>
                <span>—</span>
                <span>{memory.city}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                {memory.title}
            </h2>
            
            <div className="w-12 h-0.5 bg-current opacity-30 mb-6"></div>
            
            <div className="relative min-h-[120px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={storyIndex}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStory.title && <h4 className="font-bold opacity-80 mb-1">{currentStory.title}</h4>}
                        <p className={`text-base md:text-lg leading-loose font-sans-body opacity-90 whitespace-pre-wrap`}>
                            {currentStory.content}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Carousel Controls (if multiple stories) */}
            {memory.stories.length > 1 && (
                <div className="mt-8 flex items-center gap-4">
                     <button 
                        onClick={() => setStoryIndex(i => Math.max(0, i - 1))}
                        disabled={storyIndex === 0}
                        className={`p-2 rounded-full border border-current opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity`}
                     >
                        <ChevronLeft size={16} />
                     </button>
                     <span className="text-xs font-sans tracking-widest opacity-60">
                        {storyIndex + 1} / {memory.stories.length}
                     </span>
                     <button 
                        onClick={() => setStoryIndex(i => Math.min(memory.stories.length - 1, i + 1))}
                        disabled={storyIndex === memory.stories.length - 1}
                        className={`p-2 rounded-full border border-current opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity`}
                     >
                        <ChevronRight size={16} />
                     </button>
                </div>
            )}

            <div className={`mt-8 text-xs font-serif italic ${textMuted} flex gap-1 opacity-60`}>
                Tag: #{memory.tag}
            </div>
            </motion.div>

            {/* Visual Content - Ken Burns Effect */}
            <motion.div 
                className="w-full md:w-1/2 h-[35vh] md:h-[60vh] max-w-md relative overflow-hidden order-1 md:order-2 md:ml-12 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
            >
                <div className="w-full h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={displayImage}
                            src={displayImage} 
                            alt={memory.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.0, opacity: 0.8 }}
                            whileInView={{ scale: 1.15, opacity: 1 }}
                            animate={{ scale: 1.15, opacity: 1 }}
                            exit={{ opacity: 0.8 }}
                            transition={{ duration: 20, ease: "linear", opacity: { duration: 0.5 } }}
                        />
                    </AnimatePresence>
                </div>
                
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
            </motion.div>
            
            {/* Scroll Hint */}
            {isFirst && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="absolute bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
            >
                <ChevronDown className="w-6 h-6 opacity-50" />
            </motion.div>
            )}
        </section>
    );
};

const TimelineView: React.FC = () => {
  const { memories } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(memories[0]?.year || 2017);

  // Helper to scroll to a specific memory
  const scrollToMemory = (year: number) => {
    const element = document.getElementById(`memory-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveYear(year);
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      // We check all years 2017-2026
      const years = Array.from({ length: 10 }, (_, i) => 2017 + i);
      
      const scrollPosition = containerRef.current.scrollTop + (window.innerHeight / 3);
      
      let currentActive = activeYear;

      for (let i = years.length - 1; i >= 0; i--) {
        const year = years[i];
        const section = document.getElementById(`memory-${year}`);
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = year;
          break;
        }
      }
      if (currentActive !== activeYear) {
          setActiveYear(currentActive);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [memories, activeYear]);

  // Generate full year range 2017-2026
  const timelineYears = Array.from({ length: 10 }, (_, i) => 2017 + i);

  return (
    <div className="w-full h-full relative bg-[#fdfbf7]">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
      >
        {timelineYears.map((year, index) => {
          // Find memory for this year
          const memory = memories.find(m => m.year === year);
          
          if (!memory) {
             // Fallback for years without data (though our constants cover all now)
             return (
                 <section key={year} id={`memory-${year}`} className="w-full h-full snap-start flex items-center justify-center bg-[#fdfbf7] p-6">
                     <div className="text-stone-300 text-6xl font-serif opacity-20">{year}</div>
                 </section>
             )
          }

          const isSecret = memory.tag === 'Secret';
          const bgClass = isSecret ? 'bg-stone-900 text-stone-100' : 'bg-[#fdfbf7] text-stone-900';
          const textMuted = isSecret ? 'text-stone-400' : 'text-stone-500';

          return (
            <TimelineSection 
                key={year} 
                memory={memory} 
                bgClass={bgClass} 
                textMuted={textMuted}
                isFirst={index === 0} 
            />
          );
        })}
        
        {/* Padding for last item so it can scroll up */}
        <div className="h-32 w-full bg-[#fdfbf7]"></div>
      </div>

      {/* Navigation Ruler */}
      <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-stone-200 z-30 h-20 flex flex-col justify-center">
         <div className="w-full overflow-x-auto scrollbar-hide px-[50vw]"> 
            <div className="flex items-end space-x-8 md:space-x-12 mx-auto w-max px-8">
            {timelineYears.map((year) => {
                const isActive = activeYear === year;
                return (
                    <button
                        key={year}
                        onClick={() => scrollToMemory(year)}
                        className={`group flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}
                    >
                        <div className={`text-xs md:text-sm font-serif font-bold ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>
                            {year}
                        </div>
                        {/* Tick Mark */}
                        <div className={`w-0.5 transition-all duration-300 ${isActive ? 'h-6 bg-stone-900' : 'h-3 bg-stone-400'}`}></div>
                    </button>
                );
            })}
            </div>
         </div>
         {/* Center indicator line */}
         <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-red-500/0 transform -translate-x-1/2 pointer-events-none"></div> 
      </div>
    </div>
  );
};

export default TimelineView;
