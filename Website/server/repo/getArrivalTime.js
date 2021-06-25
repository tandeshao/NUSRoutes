const getBusStop = require("./getBusStop");

//returns a promise, use await at get request to return val
const getArrivalTime = (busStopName, busService) => {
  const obj = getBusStop(busStopName)
    .then((json) => json.ShuttleServiceResult.shuttles)
    .then((shuttles) =>
      shuttles.filter((shuttle) => shuttle.name === busService)
    )
    .then((result) => [result[0].arrivalTime, result[0].nextArrivalTime])
    .catch((err) => {
      console.log(
        `Cannot retrieve Arrival Time for ${busService} at ${busStopName}`
      );
    });

  return obj;
};

// const test = async () => {
//   let res = await getArrivalTime("COM2", "D1(To UTown)")
//   console.log(res);
// }

// test();
module.exports = getArrivalTime;
