import { createContext, useContext, RefObject } from 'react';
import * as THREE from 'three';

const GlobeContext = createContext<{ globeMeshRef: RefObject<THREE.Mesh | null> } | null>(null);

export const useGlobeMesh = () => {
  const context = useContext(GlobeContext);
  if (!context) {
    throw new Error('useGlobeMesh must be used within GlobeContextProvider');
  }
  return context.globeMeshRef;
};

export const GlobeProvider = ({ children, globeRef }: { children?: React.ReactNode; globeRef: RefObject<THREE.Mesh | null> }) => {
  return <GlobeContext.Provider value={{ globeMeshRef: globeRef }}>{children}</GlobeContext.Provider>;
};
