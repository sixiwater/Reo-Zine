
import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_BOUNDS } from '../constants';
import { useContent } from '../context/ContentContext';
import PolaroidCard from './PolaroidCard';
import { Memory } from '../types';

// Memoized Marker to prevent re-rendering all markers when one is selected
const MapMarker = memo(({ 
    memory, 
    isSelected, 
    pos, 
    onSelect 
}: { 
    memory: Memory; 
    isSelected: boolean; 
    pos: { left: string; top: string }; 
    onSelect: (m: Memory) => void 
}) => {
    return (
        <div
        className="absolute w-0 h-0 flex items-center justify-center z-20 group"
        style={{ left: pos.left, top: pos.top }}
        >
            <div 
                className="relative cursor-pointer"
                onClick={() => onSelect(memory)}
            >
                {/* Active State Ring */}
                {isSelected && (
                    <motion.div
                        layoutId="outline"
                        className="absolute -inset-4 rounded-full border border-black/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
                
                {/* Hover/Pulse Ring - using CSS animation for better performance than framer-motion loop */}
                <div className="absolute -inset-2 bg-black/5 rounded-full animate-ping opacity-75 duration-1000" style={{ animationDuration: '3s' }}></div>

                {/* The Dot */}
                <div className={`
                    w-3 h-3 md:w-4 md:h-4 bg-black rounded-full border-2 border-white transition-transform duration-300
                    ${isSelected ? 'scale-125' : 'group-hover:scale-110'}
                `}></div>
                
                {/* Label */}
                <div className={`
                    absolute left-1/2 -translate-x-1/2 mt-3 
                    whitespace-nowrap flex flex-col items-center pointer-events-none
                    transition-all duration-300 origin-top
                    ${isSelected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-1 scale-95'}
                `}>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 border border-stone-200 px-1.5 py-0.5 text-black shadow-sm">
                        {memory.city}
                    </span>
                </div>
            </div>
        </div>
    );
});

const MapView: React.FC = () => {
  const { memories } = useContent();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Group memories logic
  const groupedMemories = useMemo(() => {
    const groups = new Map<string, Memory[]>();
    memories.forEach(mem => {
      if (!groups.has(mem.city)) groups.set(mem.city, []);
      groups.get(mem.city)!.push(mem);
    });

    const result: Memory[] = [];
    groups.forEach((groupMemories, city) => {
      groupMemories.sort((a, b) => a.year - b.year);
      const first = groupMemories[0];
      const last = groupMemories[groupMemories.length - 1];
      const combinedStories = groupMemories.flatMap(m => 
        m.stories.map(s => ({
          ...s,
          title: groupMemories.length > 1 ? `${m.displayYear} · ${s.title || m.title}` : (s.title || m.title)
        }))
      );
      result.push({
        ...first,
        displayYear: groupMemories.length > 1 ? `${first.year}-${last.year}` : first.displayYear,
        title: city,
        tag: groupMemories.map(m => m.tag).join(', '),
        stories: combinedStories
      });
    });
    return result;
  }, [memories]);

  // Projection Logic
  const getPosition = (lon: number, lat: number) => {
    const lonRange = MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon;
    const latRange = MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat;
    const xPct = ((lon - MAP_BOUNDS.minLon) / lonRange) * 100;
    const yPct = 100 - ((lat - MAP_BOUNDS.minLat) / latRange) * 100;
    return { left: `${xPct}%`, top: `${yPct}%` };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-16 md:top-24 left-0 w-full text-center z-10 px-6 pointer-events-none mix-blend-multiply">
        <h2 className="text-3xl md:text-5xl font-serif text-black mb-2 tracking-tighter">MEMORY MAP</h2>
        <p className="text-xs md:text-sm text-stone-600 font-mono tracking-widest uppercase">Coordinates of a Decade</p>
      </div>

      {/* Map Container */}
      <div className="flex-1 w-full h-full flex items-center justify-center p-4 md:p-8 pt-24 md:pt-32 min-h-0">
        <div 
            className="relative w-full max-w-7xl"
            style={{ 
                aspectRatio: '1.25 / 1', 
                maxHeight: '100%',
                maxWidth: '100%'
            }}
        >
            {/* Map SVG - Static Parts optimized */}
            <svg 
                viewBox="0 0 1000 800" 
                className="w-full h-full" 
                preserveAspectRatio="xMidYMid meet"
                style={{ filter: 'contrast(1.05)' }}
            >
                <defs>
                    <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                         <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e5e5" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#ffffff" />

                <g transform="translate(50, 50) scale(0.9)">
                   <path 
                    d="M 200 450 L 180 400 L 150 350 L 120 300 L 100 250 L 150 220 L 200 200 L 250 150 L 300 120 L 400 100 L 500 80 L 600 80 L 700 100 L 750 150 L 780 200 L 760 250 L 780 300 L 750 350 L 720 400 L 700 450 L 680 500 L 650 550 L 600 580 L 550 600 L 500 620 L 450 630 L 400 640 L 350 650 L 300 630 L 250 600 L 220 550 L 200 500 Z"
                    fill="none" stroke="#e5e5e5" strokeWidth="10" strokeLinejoin="round"
                    className="opacity-50"
                   />
                   <path 
                     className="text-stone-900"
                     fill="url(#grid-pattern)" stroke="#1a1a1a" strokeWidth="1.5"
                     d="M 136 368 L 148 355 L 165 345 L 180 320 L 220 300 L 250 280 L 280 250 L 320 220 L 350 210 L 400 210 L 450 220 L 500 200 L 550 190 L 600 220 L 620 250 L 610 280 L 630 300 L 650 350 L 630 400 L 600 420 L 580 450 L 550 460 L 520 480 L 500 500 L 480 530 L 450 550 L 420 560 L 400 580 L 380 600 L 350 610 L 320 590 L 300 570 L 280 550 L 250 540 L 220 520 L 200 500 L 180 480 L 150 450 L 130 420 L 136 368 Z M 550 580 L 560 590 L 555 600 L 545 590 Z M 620 520 L 635 530 L 630 540 L 615 530 Z"
                   />
                </g>
                <g className="text-stone-200" stroke="currentColor" strokeWidth="0.5">
                    <line x1="0" y1="200" x2="1000" y2="200" />
                    <line x1="0" y1="400" x2="1000" y2="400" />
                    <line x1="0" y1="600" x2="1000" y2="600" />
                    <line x1="250" y1="0" x2="250" y2="800" />
                    <line x1="500" y1="0" x2="500" y2="800" />
                    <line x1="750" y1="0" x2="750" y2="800" />
                </g>
            </svg>

            {/* Markers Layer */}
            <div className="absolute inset-0 w-full h-full">
                {groupedMemories.map((memory) => {
                    const pos = getPosition(memory.coords[0], memory.coords[1]);
                    const isSelected = selectedMemory?.city === memory.city;
                    
                    return (
                        <MapMarker 
                            key={memory.city}
                            memory={memory}
                            isSelected={isSelected}
                            pos={pos}
                            onSelect={setSelectedMemory}
                        />
                    );
                })}
            </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <PolaroidCard 
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
