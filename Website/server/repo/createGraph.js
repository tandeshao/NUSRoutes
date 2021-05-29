const busStops = require("../data/busStops.json");
const busServices = require("../data/busServices.json");
const fs = require("fs");

let graph = {};
busStops.forEach(busStop => {
  let set = new Set();
  
  busServices.forEach((busService) => {
    const path = busService.path;
    const length = path.length;
    for (let i = 0; i < length; i ++) {
      if (path[i] == busStop.name && i + 1 < length) {
        return set.add(path[i + 1]);
      } else {
        continue;
      }
    }
  });
  graph[busStop.name] = Array.from(set);
});

fs.writeFile("../data/graph.json", JSON.stringify(graph), (err) => {
  if (err) return console.log(err);
  console.log("File has been successfully written!");
});
