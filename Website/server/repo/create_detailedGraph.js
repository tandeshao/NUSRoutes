//cannot be used without api key.

const GoogleDistanceApi = require("google-distance-api");
const graph = require("../data/bfsgraph");
const busStops = require("../data/busStops");
const fs = require("fs");

const key_input = '<API Key>';
const mode_input = "driving";
let options = {
  key: key_input,
  mode: mode_input,
};

const register_result = (graph, origin, destination, data) => {
  
  let arr = graph[origin];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == destination) {
      arr[i] = { destination, data };
    }
  }

  fs.writeFile("../data/test.json", JSON.stringify(graph), (err) => {
    if (err) return console.log(err);
    console.log("File has been successfully written!");
  });
};

for (let key in graph) {
  const arr = graph[key];

  arr.forEach((element) => {
    busStops.forEach((busStop) => {
      if (busStop.name == key) {
        options["origins"] = [busStop.latitude + ", " + busStop.longitude];
      } else if (busStop.name == element) {
        options["destinations"] = [busStop.latitude + ", " + busStop.longitude];
      }
    });
    
    GoogleDistanceApi.distance(options, (err, data) => {
    
      if (err) {
        return console.log(err);
      }
      
      const new_graph = require("../data/detailedgraph");
      register_result(new_graph, key, element, data);
    });
  });
}
