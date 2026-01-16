import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_BOUNDS } from '../constants';
import { useContent } from '../context/ContentContext';
import PolaroidCard from './PolaroidCard';

const MapView: React.FC = () => {
  const { memories } = useContent();
  // We store index instead of the object so PolaroidCard can access the live state for editing
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Helper to project lat/lon to percentage
  const getPosition = (lon: number, lat: number) => {
    const x = ((lon - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * 100;
    const y = ((lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
    return { left: `${x}%`, bottom: `${y}%` };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#fdfbf7]">
      <div className="absolute top-24 left-0 w-full text-center z-10 px-6">
        <h2 className="text-2xl md:text-4xl text-stone-800 mb-2">Memory Map</h2>
        <p className="text-sm md:text-base text-stone-500 italic font-sans-body">Tap a location to reveal our story</p>
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-3xl aspect-[4/3] md:aspect-[16/9] px-4">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 m-4 opacity-10 pointer-events-none">
           <svg viewBox="0 0 800 600" className="w-full h-full text-stone-900 fill-current">
              <path d="M150,500 Q300,550 450,520 Q600,480 700,400 Q750,250 600,150 Q450,50 300,100 Q100,150 50,300 Q20,450 150,500 Z" />
           </svg>
        </div>
        
        {/* Cities */}
        {memories.map((memory, index) => {
          const pos = getPosition(memory.coords[0], memory.coords[1]);
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              className="absolute w-8 h-8 -ml-4 -mb-4 flex items-center justify-center cursor-pointer z-10 group"
              style={{ left: pos.left, bottom: pos.bottom }}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="absolute text-[10px] w-24 text-center -top-6 text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans uppercase tracking-widest pointer-events-none">
                {memory.city}
              </span>
              
              {/* Pulse Effect */}
              <span className="absolute inline-flex h-full w-full rounded-full bg-stone-400 opacity-20 animate-ping"></span>
              
              {/* Dot */}
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className={`relative inline-flex rounded-full h-3 w-3 border-2 transition-colors duration-300 ${isSelected ? 'bg-stone-900 border-stone-900' : 'bg-white border-stone-800'}`}
              />
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <PolaroidCard 
            memoryIndex={selectedIndex} 
            onClose={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;