const BASE_URL = require("./base_url.js");
const fetch = require("node-fetch");
const AbortController = require("abort-controller");
require('dotenv').config();
const {AUTH_KEY} = process.env;
//returns a promise, use await at get request to return val
// hengmuikeng not avail in data

const getBusStop = (busStopName) => {
  const controller = new AbortController();
  const resource = "ShuttleService?busstopname=";
  const timeout = setTimeout(() => {
    controller.abort();
  }, 1500);

  const options = {
    signal: controller.signal,
    method: 'GET',
    headers: {'authorization': `Basic ${AUTH_KEY}`}
  }
  return fetch(BASE_URL + resource + busStopName, options)
    .then((res) => {
      if (!res.ok) {
        throw Error(`Could not fetch the data, StatusCode: ${res.status}`);
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
