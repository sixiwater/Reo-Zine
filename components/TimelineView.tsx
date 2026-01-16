import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MEMORIES } from '../constants';
import { ChevronDown } from 'lucide-react';

const TimelineView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(MEMORIES[0].year);

  // Helper to scroll to a specific memory
  const scrollToMemory = (year: string) => {
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
      const sections = MEMORIES.map(m => document.getElementById(`memory-${m.year}`));
      
      const scrollPosition = containerRef.current.scrollTop + (window.innerHeight / 3);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveYear(MEMORIES[i].year);
          break;
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full relative bg-[#fdfbf7]">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
      >
        {MEMORIES.map((memory, index) => {
          const isSecret = memory.tag === 'Secret';
          const bgClass = isSecret ? 'bg-stone-900 text-stone-100' : 'bg-[#fdfbf7] text-stone-900';
          const textMuted = isSecret ? 'text-stone-400' : 'text-stone-500';

          return (
            <section 
              key={index}
              id={`memory-${memory.year}`}
              className={`w-full h-full snap-start flex flex-col md:flex-row items-center justify-center p-6 relative ${bgClass} transition-colors duration-700`}
            >
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="w-full md:w-1/2 max-w-lg z-10 flex flex-col justify-center order-2 md:order-1 mt-8 md:mt-0"
              >
                <div className={`text-xs font-bold tracking-[0.2em] mb-4 uppercase ${textMuted} font-sans`}>
                  {memory.year} — {memory.city}
                </div>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  {memory.title}
                </h2>
                <div className="w-12 h-0.5 bg-current opacity-30 mb-6"></div>
                <p className={`text-base md:text-lg leading-loose font-sans-body opacity-90`}>
                  {memory.story}
                </p>
                <div className={`mt-8 text-xs font-serif italic ${textMuted}`}>
                  Tag: #{memory.tag}
                </div>
              </motion.div>

              {/* Visual Content */}
              <motion.div 
                className="w-full md:w-1/2 h-[40vh] md:h-[60vh] max-w-md relative overflow-hidden order-1 md:order-2 md:ml-12 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                 <motion.img 
                   src={memory.image} 
                   alt={memory.title}
                   className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                   initial={{ scale: 1.1 }}
                   whileInView={{ scale: 1.0 }}
                   transition={{ duration: 10, ease: "linear" }} // Ken Burns Effect
                 />
                 {/* Vignette */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
              </motion.div>
              
              {/* Scroll Hint (only on first slide) */}
              {index === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2"
                >
                  <ChevronDown className="w-6 h-6 opacity-50" />
                </motion.div>
              )}
            </section>
          );
        })}
        
        {/* Bottom padding to allow last item to be centered comfortably */}
        <div className="h-24 w-full bg-[#fdfbf7]"></div>
      </div>

      {/* Fixed Year Picker Navigation (Reverted to Bottom) */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-stone-200 z-30 py-3 px-4 flex justify-between items-center overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 md:space-x-10 mx-auto">
          {MEMORIES.map((m) => {
             // Handle range years (e.g. 2017-2019) by taking the first 4 chars for display button
             const displayYear = m.year.substring(0, 4);
             const isActive = activeYear === m.year;
             
             return (
              <button
                key={m.year}
                onClick={() => scrollToMemory(m.year)}
                className={`text-sm md:text-base font-serif transition-all duration-300 ${isActive ? 'text-stone-900 font-bold scale-110' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {displayYear}
              </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;