// const dijkstraGraphWithService = require("../data/dijkstraGraphWithService");
// const fs = require("fs");

const create_dijkstraGraphforTransfers = (input_graph) => {
  let graph = {};
  Object.keys(input_graph).forEach((elem) => {
    //create _none keys
    for (let adjacentBusStop in input_graph[elem]) {
      let new_value = {};
      input_graph[elem][adjacentBusStop]["services"].forEach(
        (service) => {
          new_value[adjacentBusStop + "_" + service] =
          input_graph[elem][adjacentBusStop]["distance"];
        }
      );

      if (!graph[elem + "_none"]) {
        graph[elem + "_none"] = new_value;
      } else {
        graph[elem + "_none"] = Object.assign(graph[elem + "_none"], new_value);
      }
    }
  });

  Object.keys(input_graph).forEach((elem) => {
    //create _service keys
    for (let adjacentBusStop in input_graph[elem]) {
      let new_value = {};
      input_graph[elem][adjacentBusStop]["services"].forEach(
        (service) => {
          if (!graph[adjacentBusStop + "_none"]) {
            graph[adjacentBusStop + "_" + service] = null;
          } else {
            graph[adjacentBusStop + "_" + service] =
              graph[adjacentBusStop + "_none"];
          }
        }
      );
    }
  });

  return graph;
};

// fs.writeFile(
//   "../data/dijkstraGraphForTransfers.json",
//   JSON.stringify(create_dijkstraGraphforTransfers(dijkstraGraphWithService)),
//   (err) => {
//     if (err) return console.log(err);
//     console.log("File has been successfully written!");
//   }
// );

module.exports = create_dijkstraGraphforTransfers;