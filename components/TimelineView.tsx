import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Upload } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const TimelineView: React.FC = () => {
  const { memories, updateMemory } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(memories[0].year);

  // Helper to scroll to a specific memory
  const scrollToMemory = (year: string) => {
    const element = document.getElementById(`memory-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveYear(year);
    }
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMemory(index, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = memories.map(m => document.getElementById(`memory-${m.year}`));
      
      const scrollPosition = containerRef.current.scrollTop + (window.innerHeight / 3);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveYear(memories[i].year);
          break;
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [memories]); // Re-bind if memories change (though length constant usually)

  return (
    <div className="w-full h-full relative bg-[#fdfbf7]">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
      >
        {memories.map((memory, index) => {
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
                <div className={`text-xs font-bold tracking-[0.2em] mb-4 uppercase ${textMuted} font-sans flex gap-2`}>
                  <EditableText 
                    tag="span" 
                    value={memory.year} 
                    onSave={(val) => updateMemory(index, 'year', val)} 
                  />
                  —
                  <EditableText 
                    tag="span" 
                    value={memory.city} 
                    onSave={(val) => updateMemory(index, 'city', val)} 
                  />
                </div>
                
                <EditableText 
                  tag="h2"
                  className="text-3xl md:text-5xl font-serif mb-6 leading-tight"
                  value={memory.title}
                  onSave={(val) => updateMemory(index, 'title', val)}
                />
                
                <div className="w-12 h-0.5 bg-current opacity-30 mb-6"></div>
                
                <EditableText 
                  tag="p"
                  className={`text-base md:text-lg leading-loose font-sans-body opacity-90`}
                  value={memory.story}
                  onSave={(val) => updateMemory(index, 'story', val)}
                  multiline
                />

                <div className={`mt-8 text-xs font-serif italic ${textMuted} flex gap-1`}>
                  Tag: #<EditableText tag="span" value={memory.tag} onSave={(val) => updateMemory(index, 'tag', val)} />
                </div>
              </motion.div>

              {/* Visual Content */}
              <motion.div 
                className="w-full md:w-1/2 h-[40vh] md:h-[60vh] max-w-md relative overflow-hidden order-1 md:order-2 md:ml-12 shadow-xl group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                 <label className="cursor-pointer relative block w-full h-full">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(index, e)}
                    />
                    <motion.img 
                      src={memory.image} 
                      alt={memory.title}
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1.0 }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                    {/* Upload Overlay Hint */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white flex flex-col items-center gap-2">
                        <Upload size={32} />
                        <span className="text-xs uppercase tracking-widest">Change Photo</span>
                      </div>
                    </div>
                 </label>
                 
                 {/* Vignette */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
              </motion.div>
              
              {/* Scroll Hint */}
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
        
        <div className="h-24 w-full bg-[#fdfbf7]"></div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-stone-200 z-30 py-3 px-4 flex justify-between items-center overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 md:space-x-10 mx-auto">
          {memories.map((m) => {
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