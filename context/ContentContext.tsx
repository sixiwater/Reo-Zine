import React, { createContext, useContext } from 'react';
import { Memory } from '../types';

interface ContentContextType {
  memories: Memory[];
  updateMemory: (index: number, field: keyof Memory, value: string) => void;
  resetMemories: () => void;
}

export const ContentContext = createContext<ContentContextType>({
  memories: [],
  updateMemory: () => {},
  resetMemories: () => {},
});

export const useContent = () => useContext(ContentContext);