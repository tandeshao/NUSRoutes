const djikstraGraphWithService = require('../data/djikstraGraphWithService');
let busServices = require('../data/busServices');
const djikstra = require('./djikstra');
const find_service = require('./find_service');
const fs = require('fs');

//checks if service is still available. Return false if service is unavailable.
const checkTime = (time, date, data) => {
  const arr = data[date];
  if (arr[0] == 0 || time == 0) {
    return false;
  } else {
    return arr[0] <= time && time <= arr[1];
  }
}

const withTime = (start, end, time, date) => {
  let unavailable_service = [];
  busServices.forEach(service => {
    if (!checkTime(time, date, service)) {
      const unavailable = service["service_name"];
      unavailable_service.push(unavailable);
      busServices = busServices.filter(elem => elem["service_name"] !== unavailable);
    }
  })

  let graph = {};
  for (let origin in djikstraGraphWithService) {
    graph[origin] = {};
    const data = djikstraGraphWithService[origin];
    for (let destination in data) {
      const info =  data[destination];
      let arr = info["services"];     
      unavailable_service.forEach(service => {
        arr = arr.filter(elem => elem !== service);
      })

      if (arr.length !== 0)  {
        graph[origin][destination] = info["distance"];
      } 
    }
  }
  
  return find_service(djikstra(start, end, graph), busServices);
}

module.exports = withTime;