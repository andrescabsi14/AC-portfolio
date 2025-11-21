'use client';

import { useState } from 'react';
import { useGlobeConfig, type LocationMarker } from '@/contexts/GlobeConfigContext';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const CONFIG_SECTION_CLASS =
  'flex-shrink-0 w-80 h-full border border-white/10 rounded-lg p-4 bg-white/5 flex flex-col max-h-[80vh] min-h-0';
const CONFIG_SECTION_BODY_CLASS =
  'space-y-3 text-white text-xs overflow-y-auto pr-2 flex-1 min-h-0 max-h-full';

export const AdminControlPanel = ({ isExpanded }: { isExpanded: boolean }) => {
  const {
    config,
    updateConfig,
    updateLightDir,
    updateProjectMarkerColor,
    updateMomentMarkerColor,
    updateProjectMarkerCylinderColor,
    updateMomentMarkerCylinderColor,
    addLocation,
    removeLocation,
    updateLocation,
    resetToDefaults,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useGlobeConfig();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationLat, setNewLocationLat] = useState('0');
  const [newLocationLng, setNewLocationLng] = useState('0');
  const [newLocationType, setNewLocationType] = useState<'project' | 'moment'>('project');

  if (!isExpanded) return null;

  const handleAddLocation = () => {
    if (newLocationName && newLocationLat && newLocationLng) {
      const newLocation: LocationMarker = {
        id: `custom-${Date.now()}`,
        title: newLocationName,
        lat: parseFloat(newLocationLat),
        lng: parseFloat(newLocationLng),
        type: newLocationType,
      };
      addLocation(newLocation);
      setNewLocationName('');
      setNewLocationLat('0');
      setNewLocationLng('0');
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <button className="fixed cursor-pointer bottom-6 right-6 z-40 bg-black/80 backdrop-blur border border-white/20 rounded px-4 py-2 text-white text-sm font-semibold hover:bg-black/90 transition-colors">
          Admin Controls
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="flex-shrink-0 border-b border-white/10">
          <DrawerTitle>Globe Configuration</DrawerTitle>
        </DrawerHeader>

        {/* Horizontal Scrolling Container */}
        <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0 h-[400px]">
          <div className="flex gap-6 p-6 min-w-max">
            {/* Globe Section */}
            <ConfigSection title="Globe">
              <div>
                <label className="block text-white/70 mb-1">Segments</label>
                <input
                  type="range"
                  min="16"
                  max="128"
                  step="1"
                  value={config.globeSegments}
                  onChange={(e) => updateConfig({ globeSegments: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.globeSegments}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1">Scale</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.0001"
                  value={config.globeScale}
                  onChange={(e) => updateConfig({ globeScale: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.globeScale.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1">Blur</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.0001"
                  value={config.globeBlur}
                  onChange={(e) => updateConfig({ globeBlur: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.globeBlur.toFixed(3)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1">Rotation Speed</label>
                <input
                  type="range"
                  min="0"
                  max="0.0001"
                  step="0.0001"
                  value={config.rotationSpeed}
                  onChange={(e) => updateConfig({ rotationSpeed: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.rotationSpeed.toFixed(5)}</span>
              </div>
              <SubSection title="Position">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">X</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.globePositionX}
                    onChange={(e) => updateConfig({ globePositionX: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.globePositionX.toFixed(3)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Y</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.globePositionY}
                    onChange={(e) => updateConfig({ globePositionY: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.globePositionY.toFixed(3)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Z</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.globePositionZ}
                    onChange={(e) => updateConfig({ globePositionZ: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.globePositionZ.toFixed(3)}</span>
                </div>
              </SubSection>
            </ConfigSection>

            {/* Clouds Section */}
            <ConfigSection title="Clouds">
              <SubSection title="Geometry">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Scale</label>
                  <input
                    type="range"
                    min="0.0001"
                    max="2"
                    step="0.0001"
                    value={config.cloudScale}
                    onChange={(e) => updateConfig({ cloudScale: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudScale.toFixed(2)}</span>
                </div>
              </SubSection>
              <SubSection title="Position">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">X</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.cloudPositionX}
                    onChange={(e) => updateConfig({ cloudPositionX: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudPositionX.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Y</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.cloudPositionY}
                    onChange={(e) => updateConfig({ cloudPositionY: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudPositionY.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Z</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.cloudPositionZ}
                    onChange={(e) => updateConfig({ cloudPositionZ: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudPositionZ.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Blur</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.0001"
                    value={config.cloudBlur}
                    onChange={(e) => updateConfig({ cloudBlur: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudBlur.toFixed(1)}</span>
                </div>
              </SubSection>
              <SubSection title="Appearance">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Opacity</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.0001"
                    value={config.cloudOpacity}
                    onChange={(e) => updateConfig({ cloudOpacity: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.cloudOpacity.toFixed(2)}</span>
                </div>
              </SubSection>
            </ConfigSection>

            {/* Lighting Section */}
            <ConfigSection title="Lighting">
              <div>
                <label className="block text-white/70 mb-1 text-xs">Light X</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={config.lightDir.x}
                  onChange={(e) => updateLightDir({ x: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.lightDir.x.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Light Y</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={config.lightDir.y}
                  onChange={(e) => updateLightDir({ y: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.lightDir.y.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Light Z</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={config.lightDir.z}
                  onChange={(e) => updateLightDir({ z: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.lightDir.z.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Light Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.lightIntensity}
                  onChange={(e) => updateConfig({ lightIntensity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.lightIntensity.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Light Color</label>
                <input
                  type="color"
                  value={config.lightColor}
                  onChange={(e) => updateConfig({ lightColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Ambient Light</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.0001"
                  value={config.ambientLightIntensity}
                  onChange={(e) => updateConfig({ ambientLightIntensity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.ambientLightIntensity.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Directional Light</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.0001"
                  value={config.directionalLightIntensity}
                  onChange={(e) => updateConfig({ directionalLightIntensity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.directionalLightIntensity.toFixed(2)}</span>
              </div>
            </ConfigSection>

            {/* Atmosphere Section */}
            <ConfigSection title="Atmosphere">
              <SubSection title="Geometry">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Scale</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={config.atmosphereScale}
                    onChange={(e) => updateConfig({ atmosphereScale: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmosphereScale.toFixed(2)}</span>
                </div>
              </SubSection>
              <SubSection title="Position">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">X</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.atmospherePositionX}
                    onChange={(e) => updateConfig({ atmospherePositionX: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmospherePositionX.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Y</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.atmospherePositionY}
                    onChange={(e) => updateConfig({ atmospherePositionY: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmospherePositionY.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Z</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.0001"
                    value={config.atmospherePositionZ}
                    onChange={(e) => updateConfig({ atmospherePositionZ: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmospherePositionZ.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Blur</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.0001"
                    value={config.atmosphereBlur}
                    onChange={(e) => updateConfig({ atmosphereBlur: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmosphereBlur.toFixed(1)}</span>
                </div>
              </SubSection>
              <SubSection title="Appearance">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Terminator Softness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={config.terminatorSoftness}
                    onChange={(e) => updateConfig({ terminatorSoftness: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.terminatorSoftness.toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Color</label>
                  <input
                    type="color"
                    value={config.atmosphereColor}
                    onChange={(e) => updateConfig({ atmosphereColor: e.target.value })}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-white/70 mb-1 text-xs">Intensity</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.0001"
                    value={config.atmosphereIntensity}
                    onChange={(e) => updateConfig({ atmosphereIntensity: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-white/50 text-xs">{config.atmosphereIntensity.toFixed(2)}</span>
                </div>
              </SubSection>
            </ConfigSection>

            {/* Stars Section */}
            <ConfigSection title="Stars">
              <div>
                <label className="block text-white/70 mb-1 text-xs">Visibility</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.0001"
                  value={config.starVisibility}
                  onChange={(e) => updateConfig({ starVisibility: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.starVisibility.toFixed(2)}</span>
              </div>
            </ConfigSection>

            {/* Current Location Section */}
            <ConfigSection title="Current Location">
              <div>
                <label className="block text-white/70 mb-1 text-xs">Color</label>
                <input
                  type="color"
                  value={config.currentLocationColor}
                  onChange={(e) => updateConfig({ currentLocationColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Pulse Size</label>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.005"
                  value={config.currentLocationPulseSize}
                  onChange={(e) => updateConfig({ currentLocationPulseSize: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.currentLocationPulseSize.toFixed(3)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Pulse Speed</label>
                <input
                  type="range"
                  min="0.0001"
                  max="2"
                  step="0.0001"
                  value={config.currentLocationPulseSpeed}
                  onChange={(e) => updateConfig({ currentLocationPulseSpeed: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.currentLocationPulseSpeed.toFixed(1)}</span>
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-xs">Visibility</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.0001"
                  value={config.currentLocationVisibility}
                  onChange={(e) => updateConfig({ currentLocationVisibility: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <span className="text-white/50 text-xs">{config.currentLocationVisibility.toFixed(2)}</span>
              </div>
            </ConfigSection>

            {/* Project Markers Section */}
            <ConfigSection title="Project Markers">
            <div>
              <label className="block text-white/70 mb-1 text-xs">Color</label>
              <input
                type="color"
                value={config.projectMarkerColor}
                onChange={(e) => updateProjectMarkerColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 text-xs">Base Color</label>
              <input
                type="color"
                value={config.projectMarkerCylinderColor}
                onChange={(e) => updateProjectMarkerCylinderColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </ConfigSection>

          {/* Moment Markers Section */}
          <ConfigSection title="Moment Markers">
            <div>
              <label className="block text-white/70 mb-1 text-xs">Color</label>
              <input
                type="color"
                value={config.momentMarkerColor}
                onChange={(e) => updateMomentMarkerColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 text-xs">Base Color</label>
              <input
                type="color"
                value={config.momentMarkerCylinderColor}
                onChange={(e) => updateMomentMarkerCylinderColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </ConfigSection>

            {/* Locations Section */}
            <ConfigSection title="Manage Locations">
              <div className="space-y-2">
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Name</label>
                  <input
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="Location name"
                    className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Latitude</label>
                  <input
                    type="number"
                    value={newLocationLat}
                    onChange={(e) => setNewLocationLat(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Longitude</label>
                  <input
                    type="number"
                    value={newLocationLng}
                    onChange={(e) => setNewLocationLng(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 text-xs">Type</label>
                  <select
                    value={newLocationType}
                    onChange={(e) => setNewLocationType(e.target.value as 'project' | 'moment')}
                    className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
                  >
                    <option value="project">Project</option>
                    <option value="moment">Moment</option>
                  </select>
                </div>
                <button
                  onClick={handleAddLocation}
                  className="w-full bg-green-500/50 hover:bg-green-500 px-3 py-2 rounded text-xs transition-colors text-white mt-2"
                >
                  Add Location
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <h4 className="text-white/70 text-xs font-semibold mb-2">Existing Locations</h4>
                <div className="space-y-1 max-h-[150px] overflow-y-auto">
                  {config.locations?.map((loc) => (
                    <div key={loc.id} className="flex justify-between items-start text-xs text-white/60 p-2 bg-white/5 rounded">
                      <div>
                        <div className="font-semibold text-white">{loc.title}</div>
                        <div className="text-xs">{loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}</div>
                        <div className="text-xs text-white/40">{loc.type}</div>
                      </div>
                      <button
                        onClick={() => removeLocation(loc.id)}
                        className="bg-red-500/50 hover:bg-red-500 px-2 py-1 rounded text-xs text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ConfigSection>

            {/* Action Buttons */}
            <ConfigSection title="Actions">
              <button
                onClick={saveToLocalStorage}
                className="w-full bg-blue-500/50 hover:bg-blue-500 px-3 py-2 rounded text-xs transition-colors text-white"
              >
                Save to Storage
              </button>
              <button
                onClick={loadFromLocalStorage}
                className="w-full bg-purple-500/50 hover:bg-purple-500 px-3 py-2 rounded text-xs transition-colors text-white mt-2"
              >
                Load from Storage
              </button>
              <button
                onClick={resetToDefaults}
                className="w-full bg-red-500/50 hover:bg-red-500 px-3 py-2 rounded text-xs transition-colors text-white mt-2"
              >
                Reset Defaults
              </button>
            </ConfigSection>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Helper Components
function ConfigSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={CONFIG_SECTION_CLASS}>
      <h3 className="text-white font-semibold mb-4 text-sm flex-shrink-0">{title}</h3>
      <div className={CONFIG_SECTION_BODY_CLASS}>{children}</div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 pt-3 mt-3">
      <h4 className="text-white/70 text-xs font-semibold mb-2">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
