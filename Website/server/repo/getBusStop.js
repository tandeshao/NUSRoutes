const BASE_URL = require("./base_url.js");
const fetch = require("node-fetch");
const AbortController = require("abort-controller");

//returns a promise, use await at get request to return val
// hengmuikeng not avail in data
const getBusStop = (busStopName) => {
  const controller = new AbortController();
  const resource = "/ShuttleService?busstopname=";
  const timeout = setTimeout(() => {
    controller.abort();
  }, 1500);

  return fetch(BASE_URL + resource + busStopName, {
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch the data, problem with StatusCode");
      } else {
        return res.json();
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      clearTimeout(timeout);
    });
};

module.exports = getBusStop;
