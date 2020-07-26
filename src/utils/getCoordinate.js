module.exports = (location) => {

  const {
    longitude: long,
    latitude: lat,
  } = location

  const accuracy = location.accuracy || 0

  const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
  const circumference = (40075 / 360) * 1000;

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
  const longDelta = (accuracy / oneDegreeOfLongitudeInMeters);

  return {
    lat,
    long,
    latDel: Math.max(0, latDelta),
    longDel: Math.max(0, longDelta),
  };
}