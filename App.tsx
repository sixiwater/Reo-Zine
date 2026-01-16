import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Map, ScrollText, RotateCcw } from 'lucide-react';
import Landing from './components/Landing';
import MapView from './components/MapView';
import TimelineView from './components/TimelineView';
import AudioPlayer from './components/AudioPlayer';
import { ViewMode, Memory } from './types';
import { ContentContext } from './context/ContentContext';
import { MEMORIES as DEFAULT_MEMORIES } from './constants';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  
  // State for editable content
  const [memories, setMemories] = useState<Memory[]>(() => {
    // Try to load from local storage
    try {
      const saved = localStorage.getItem('echoes_memories');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch (e) {
      console.error("Failed to load memories", e);
      return DEFAULT_MEMORIES;
    }
  });

  // Persist to local storage whenever memories change
  useEffect(() => {
    localStorage.setItem('echoes_memories', JSON.stringify(memories));
  }, [memories]);

  const updateMemory = (index: number, field: keyof Memory, value: string) => {
    setMemories(prev => {
      const newMemories = [...prev];
      newMemories[index] = { ...newMemories[index], [field]: value };
      return newMemories;
    });
  };

  const resetMemories = () => {
    if (window.confirm("Reset all content to original defaults? This cannot be undone.")) {
      setMemories(DEFAULT_MEMORIES);
      window.location.reload(); 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <ContentContext.Provider value={{ memories, updateMemory, resetMemories }}>
      <div className="w-full h-screen overflow-hidden text-stone-800 antialiased selection:bg-stone-200 selection:text-stone-900">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="landing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              <Landing onStart={() => setHasStarted(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="app-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full h-full relative flex flex-col"
            >
              {/* Header / Nav Switch */}
              <header className="absolute top-0 left-0 w-full z-40 p-6 flex justify-between items-center pointer-events-none">
                 <div className="font-serif font-bold text-lg pointer-events-auto text-stone-800/80 cursor-default">
                   Echoes.
                 </div>
                 
                 <div className="flex gap-2 pointer-events-auto">
                    {/* Reset Button (Hidden feature mostly) */}
                    <button 
                      onClick={resetMemories}
                      className="bg-white/90 backdrop-blur shadow-sm rounded-full p-3 border border-stone-200 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      title="Reset Content"
                    >
                      <RotateCcw size={18} />
                    </button>

                    <div className="bg-white/90 backdrop-blur shadow-sm rounded-full p-1 flex space-x-1 border border-stone-200">
                      <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'map' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
                        aria-label="Map View"
                      >
                        <Map size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode('timeline')}
                        className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'timeline' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
                        aria-label="Timeline View"
                      >
                        <ScrollText size={18} />
                      </button>
                    </div>
                 </div>
              </header>

              {/* Main Content Area */}
              <main className="w-full h-full relative">
                 <AnimatePresence mode='wait'>
                   {viewMode === 'map' ? (
                     <motion.div 
                       key="map"
                       initial={{ opacity: 0, scale: 1.05 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5 }}
                       className="w-full h-full"
                     >
                       <MapView />
                     </motion.div>
                   ) : (
                     <motion.div 
                       key="timeline"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5 }}
                       className="w-full h-full"
                     >
                       <TimelineView />
                     </motion.div>
                   )}
                 </AnimatePresence>
              </main>
              
              <AudioPlayer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ContentContext.Provider>
  );
};

export default App;