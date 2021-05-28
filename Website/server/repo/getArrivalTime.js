const getBusStop = require("./getBusStop");

//returns a promise, use await at get request to return val
const getArrivalTime = async (busStopName, busService) => {
  const obj = getBusStop(busStopName)
    .then((json) => json.ShuttleServiceResult.shuttles)
    .then((shuttles) =>
      shuttles.filter((shuttle) => shuttle.name === busService)
    )
    .then((result) => result[0].arrivalTime)
    .catch((err) => {
      console.log(
        `Cannot retrieve Arrival Time for ${busService} at ${busStopName}`
      );
    });

  return obj;
};

module.exports = getArrivalTime;
