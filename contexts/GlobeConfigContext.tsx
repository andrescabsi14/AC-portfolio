'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface LocationMarker {
  id: string;
  title: string;
  lat: number;
  lng: number;
  type: 'project' | 'moment';
}

export interface GlobeConfig {
  // Lighting
  lightDir: { x: number; y: number; z: number };
  lightIntensity: number;
  lightColor: string;

  // Atmosphere
  terminatorSoftness: number;
  atmosphereColor: string;
  atmosphereIntensity: number;
  glowColor: string;
  glowIntensity: number;

  // Project Markers
  projectMarkerColor: string;
  projectMarkerEmissive: string;
  projectMarkerMetalness: number;
  projectMarkerRoughness: number;

  // Moment Markers
  momentMarkerColor: string;
  momentMarkerEmissive: string;
  momentMarkerMetalness: number;
  momentMarkerRoughness: number;

  // Environment
  cloudOpacity: number;
  starVisibility: number;
  rotationSpeed: number;
  ambientLightIntensity: number;
  directionalLightIntensity: number;

  // Geometry - Globe
  globeSegments: number;
  globeScale: number;
  globeBlur: number;

  // Geometry - Clouds
  cloudScale: number;

  // Geometry - Atmosphere
  atmosphereScale: number;

  // Geometry - Glow
  glowScale: number;

  // Geometry - Markers
  projectMarkerSize: number;
  projectMarkerSegments: number;
  momentMarkerSize: number;
  momentMarkerSegments: number;

  // Current Location Pulse
  currentLocationColor: string;
  currentLocationPulseSize: number;
  currentLocationPulseSpeed: number;
  currentLocationVisibility: number;

  // Positions - Cloud Layer
  cloudPositionX: number;
  cloudPositionY: number;
  cloudPositionZ: number;
  cloudBlur: number;

  // Positions - Atmosphere
  atmospherePositionX: number;
  atmospherePositionY: number;
  atmospherePositionZ: number;
  atmosphereBlur: number;
  atmosphereGlow: number;

  // Positions - Glow
  glowPositionX: number;
  glowPositionY: number;
  glowPositionZ: number;

  // Marker Geometry
  markerDistanceFromGlobe: number;
  markerLineHeight: number;
  markerCylinderBaseRadius: number;
  projectMarkerTipRadius: number;
  momentMarkerTipRadius: number;

  // Locations
  locations: LocationMarker[];
}

const DEFAULT_CONFIG: GlobeConfig = {
  lightDir: { x: 0.6, y: 0.4, z: 0 },
  lightIntensity: 0.9,
  lightColor: '#ffd814',

  terminatorSoftness: 0.25,
  atmosphereColor: '#0077be',
  atmosphereIntensity: 0.4,
  glowColor: '#0857f7',
  glowIntensity: 0.9,

  projectMarkerColor: '#00ff41',
  projectMarkerEmissive: '#00ff41',
  projectMarkerMetalness: 0.7,
  projectMarkerRoughness: 0.2,

  momentMarkerColor: '#10c6ee',
  momentMarkerEmissive: '#1070ee',
  momentMarkerMetalness: 0.7,
  momentMarkerRoughness: 0.2,

  cloudOpacity: 0.30,
  starVisibility: 1,
  rotationSpeed: 0.010,
  ambientLightIntensity: 0.5,
  directionalLightIntensity: 1.38,

  globeSegments: 128,
  globeScale: 1,
  globeBlur: 0.038,

  cloudScale: 1,

  atmosphereScale: 1.05,

  glowScale: 1.00,

  projectMarkerSize: 0.035,
  projectMarkerSegments: 16,
  momentMarkerSize: 0.025,
  momentMarkerSegments: 16,

  currentLocationColor: '#a21111ff',
  currentLocationPulseSize: 0.005,
  currentLocationPulseSpeed: 1.1,
  currentLocationVisibility: 0.4,

  cloudPositionX: 0,
  cloudPositionY: 0,
  cloudPositionZ: 0.05,
  cloudBlur: 0,

  atmospherePositionX: 0,
  atmospherePositionY: 0,
  atmospherePositionZ: 0,
  atmosphereBlur: 0,
  atmosphereGlow: 0,

  glowPositionX: 0,
  glowPositionY: 0,
  glowPositionZ: 0,

  markerDistanceFromGlobe: 1.07,
  markerLineHeight: 0.21,
  markerCylinderBaseRadius: 0.005,
  projectMarkerTipRadius: 0.035,
  momentMarkerTipRadius: 0.025,

  locations: [],
};

interface GlobeConfigContextType {
  config: GlobeConfig;
  updateConfig: (partial: Partial<GlobeConfig>) => void;
  updateLightDir: (dir: { x?: number; y?: number; z?: number }) => void;
  updateProjectMarkerColor: (color: string) => void;
  updateMomentMarkerColor: (color: string) => void;
  addLocation: (location: LocationMarker) => void;
  removeLocation: (id: string) => void;
  updateLocation: (id: string, location: Partial<LocationMarker>) => void;
  resetToDefaults: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const GlobeConfigContext = createContext<GlobeConfigContextType | null>(null);

export const GlobeConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<GlobeConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('globeConfig');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_CONFIG;
        }
      }
    }
    return DEFAULT_CONFIG;
  });

  const updateConfig = (partial: Partial<GlobeConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const updateLightDir = (dir: { x?: number; y?: number; z?: number }) => {
    setConfig((prev) => ({
      ...prev,
      lightDir: { ...prev.lightDir, ...dir },
    }));
  };

  const updateProjectMarkerColor = (color: string) => {
    setConfig((prev) => ({
      ...prev,
      projectMarkerColor: color,
      projectMarkerEmissive: color,
    }));
  };

  const updateMomentMarkerColor = (color: string) => {
    setConfig((prev) => ({
      ...prev,
      momentMarkerColor: color,
      momentMarkerEmissive: color,
    }));
  };

  const addLocation = (location: LocationMarker) => {
    setConfig((prev) => ({
      ...prev,
      locations: [...prev.locations, location],
    }));
  };

  const removeLocation = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      locations: prev.locations.filter((loc) => loc.id !== id),
    }));
  };

  const updateLocation = (id: string, location: Partial<LocationMarker>) => {
    setConfig((prev) => ({
      ...prev,
      locations: prev.locations.map((loc) =>
        loc.id === id ? { ...loc, ...location } : loc
      ),
    }));
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('globeConfig', JSON.stringify(config));
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('globeConfig');
      if (saved) {
        try {
          setConfig(JSON.parse(saved));
        } catch {
          console.error('Failed to load config from localStorage');
        }
      }
    }
  };

  return (
    <GlobeConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateLightDir,
        updateProjectMarkerColor,
        updateMomentMarkerColor,
        addLocation,
        removeLocation,
        updateLocation,
        resetToDefaults,
        saveToLocalStorage,
        loadFromLocalStorage,
      }}
    >
      {children}
    </GlobeConfigContext.Provider>
  );
};

export const useGlobeConfig = () => {
  const context = useContext(GlobeConfigContext);
  if (!context) {
    throw new Error('useGlobeConfig must be used within GlobeConfigProvider');
  }
  return context;
};
