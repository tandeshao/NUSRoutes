const getBusStop = require("./getBusStop");

//returns a promise, use await at get request to return val
const getArrivalTime = (busStopName, busService, busstopcode) => {
  const obj = getBusStop(busStopName)
    .then((json) => json.ShuttleServiceResult.shuttles)
    .then((shuttles) => {
      if (busstopcode) {
        return shuttles.filter(
          (shuttle) =>
            shuttle.name === busService && shuttle.busstopcode === busstopcode
        );
      } else {
        return shuttles.filter((shuttle) => shuttle.name === busService);
      }
    })
    .then((result) => [result[0].arrivalTime, result[0].nextArrivalTime])
    .catch((err) => {
      console.log(
        err
      );
    });

  return obj;
};

module.exports = getArrivalTime;
