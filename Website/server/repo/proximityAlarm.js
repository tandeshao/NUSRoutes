const busStops = require("../data/busStops.json");

function proximityAlarm(lat1, lon1, dest) {
  const distance = 175;
  var R = 6371; // Radius of the earth in km
  const details = busStops.filter((stops) => stops.name === dest)[0];
  const lat2 = details.latitude;
  const lon2 = details.longitude;
  var dLat = degToRad(lat2 - lat1); // deg2rad below
  var dLon = degToRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 1000; // Distance in meter
  return d <= distance;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = proximityAlarm;