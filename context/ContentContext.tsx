
import React, { createContext, useContext } from 'react';
import { Memory } from '../types';

interface ContentContextType {
  memories: Memory[];
}

export const ContentContext = createContext<ContentContextType>({
  memories: [],
});

export const useContent = () => useContext(ContentContext);
