const rr = require("./repo/routeRecommendation");
const dijkstraGraphWithService = require("./data/dijkstraGraphWithService");

const route = rr(
  "AS7",
  "COM2",
  1700,
  "vacation-weekdays",
  dijkstraGraphWithService,
  150,
  1000,
  12
)[0]["Path"];

console.log(route);
const transferredBuses = [];
let prev = "";
let start = 0;
let end = 0;

for (let i = 1; i < route.length; i++) {
  const busStop = route[i];
  const service = busStop.substring(busStop.indexOf("_") + 1, busStop.length);
  if (route.length === 2) {
    transferredBuses.push({start: 0, end: 1, service: service});
  } else if (i === 1) {
    prev = service;

  } else if (service !== prev) {
    transferredBuses.push({ start: start, end: end, service: prev });
    start = end;
    prev = service;
  } else if (i === route.length - 1) {
    transferredBuses.push({ start: start, end: end + 1, service: prev });
  }

  end = i;
}

console.log(transferredBuses);

