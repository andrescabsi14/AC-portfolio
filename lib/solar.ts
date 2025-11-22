const DAY_MS = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const RAD = Math.PI / 180;

const toJulian = (date: Date) => date.valueOf() / DAY_MS - 0.5 + J1970;
const toDays = (date: Date) => toJulian(date) - J2000;
const solarMeanAnomaly = (days: number) => RAD * (357.5291 + 0.98560028 * days);
const equationOfCenter = (M: number) =>
  RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
const eclipticLongitude = (M: number, C: number) => M + C + RAD * 102.9372 + Math.PI;
const sunCoords = (days: number, obliquityRad: number) => {
  const M = solarMeanAnomaly(days);
  const C = equationOfCenter(M);
  const L = eclipticLongitude(M, C);
  return {
    dec: Math.asin(Math.sin(L) * Math.sin(obliquityRad)),
    ra: Math.atan2(Math.sin(L) * Math.cos(obliquityRad), Math.cos(L)),
  };
};
const siderealTime = (days: number, lw: number) => RAD * (280.16 + 360.9856235 * days) - lw;
const hourAngle = (st: number, ra: number) => st - ra;

export interface CartesianVector3 {
  x: number;
  y: number;
  z: number;
}

export const getSunAzimuthAltitude = (
  date: Date,
  lat: number,
  lng: number,
  obliquityDegrees = 23.4397
) => {
  const obliquityRad = obliquityDegrees * RAD;
  const lw = RAD * -lng;
  const phi = RAD * lat;
  const d = toDays(date);
  const { dec, ra } = sunCoords(d, obliquityRad);
  const H = hourAngle(siderealTime(d, lw), ra);

  const altitude = Math.asin(
    Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)
  );
  const azimuth = Math.atan2(
    Math.sin(H),
    Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)
  );

  return { azimuth, altitude };
};

const normalizeVector = ({ x, y, z }: CartesianVector3): CartesianVector3 => {
  const length = Math.sqrt(x * x + y * y + z * z);
  if (!length || !isFinite(length)) {
    return { x: 0, y: 0, z: 0 };
  }
  return { x: x / length, y: y / length, z: z / length };
};

export const getSunDirectionVector = (
  date: Date,
  lat: number,
  lng: number,
  obliquityDegrees = 23.4397
): CartesianVector3 => {
  const { azimuth, altitude } = getSunAzimuthAltitude(date, lat, lng, obliquityDegrees);
  const x = Math.cos(altitude) * Math.sin(azimuth);
  const y = Math.sin(altitude);
  const z = Math.cos(altitude) * Math.cos(azimuth);
  return normalizeVector({ x, y, z });
};
