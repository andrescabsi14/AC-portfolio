import * as THREE from 'three';

export const normalizeHexColor = (value: string) => {
  if (!value || !value.startsWith('#')) {
    return value;
  }

  const hex = value.slice(1);
  if (hex.length === 8) {
    return `#${hex.slice(0, 6)}`;
  }

  return value;
};

export const calculateSunPosition = (lat: number, lng: number, date: Date) => {
  // Simplified sunrise/sunset calculation
  const J2000 = new Date('2000-01-01').getTime();
  const julianDay = (date.getTime() - J2000) / 86400000 + 2451545;

  // Mean solar time
  const n = julianDay - 2451545 + 0.0008;
  const J = n - lng / 360;
  const M = (357.5291 + 0.98560028 * J) % 360;
  const C = (1.9146 - 0.004817 * Math.cos(M * Math.PI / 180) - 0.000135 * Math.cos(2 * M * Math.PI / 180)) * Math.sin(M * Math.PI / 180);
  const lambda = (280.4665 + 36000.76983 * (julianDay / 36525) + C) % 360;
  const SunDec = Math.asin(Math.sin(23.4397 * Math.PI / 180) * Math.sin(lambda * Math.PI / 180));

  const latRad = lat * Math.PI / 180;
  const cosH = -Math.tan(latRad) * Math.tan(SunDec);

  if (cosH > 1) return { sunrise: null, sunset: null, isDay: false, phase: 'night' };
  if (cosH < -1) return { sunrise: null, sunset: null, isDay: true, phase: 'day' };

  const H = Math.acos(cosH) * 180 / Math.PI;
  const T0 = (J % 1) + lng / 360;
  const sunrise = T0 - H / 360;
  const sunset = T0 + H / 360;

  const localTime = (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

  // Normalize to 0-1 range
  const normalizedSunrise = sunrise < 0 ? sunrise + 1 : sunrise > 1 ? sunrise - 1 : sunrise;
  const normalizedSunset = sunset < 0 ? sunset + 1 : sunset > 1 ? sunset - 1 : sunset;

  const dawnStart = normalizedSunrise - 0.02; // ~30 min before
  const dawnEnd = normalizedSunrise + 0.02;
  const duskStart = normalizedSunset - 0.02;
  const duskEnd = normalizedSunset + 0.02;

  let phase = 'night';
  let phaseProgress = 0;

  if (localTime >= dawnStart && localTime < dawnEnd) {
    phase = 'dawn';
    phaseProgress = (localTime - dawnStart) / (dawnEnd - dawnStart);
  } else if (localTime >= dawnEnd && localTime < duskStart) {
    phase = 'day';
    phaseProgress = 1;
  } else if (localTime >= duskStart && localTime < duskEnd) {
    phase = 'dusk';
    phaseProgress = (localTime - duskStart) / (duskEnd - duskStart);
  }

  return {
    sunrise: normalizedSunrise,
    sunset: normalizedSunset,
    isDay: localTime >= dawnEnd && localTime < duskStart,
    phase,
    phaseProgress,
  };
};

export const latLngToCartesian = (lat: number, lng: number, radius = 1.02): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.sin(theta)  // Negate z to match Earth's negative z-scale
  );
};

export const getMarkerTransform = (
  lat: number,
  lng: number,
  distance: number = 1.05,
  height: number = 0.1
) => {
  const positionVec = latLngToCartesian(lat, lng, distance);
  const direction = positionVec.clone().normalize();
  // Position cylinder center so it starts at the tip and extends toward the globe center
  const center = direction.clone().multiplyScalar(distance - height / 2);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  return {
    position: [center.x, center.y, center.z] as [number, number, number],
    tipPosition: [positionVec.x, positionVec.y, positionVec.z] as [number, number, number],
    quaternion,
    height,
  };
};

export const getTimeRatio = () => {
  const now = new Date();
  const localHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  return (localHours % 24) / 24;
};
