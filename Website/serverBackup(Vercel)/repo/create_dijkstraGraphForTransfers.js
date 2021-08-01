// const dijkstraGraphWithService = require("../data/dijkstraGraphWithService");
// const fs = require("fs");

const create_dijkstraGraphforTransfers = (input_graph) => {
  let graph = {};
  Object.keys(input_graph).forEach((elem) => {
    //create _none keys
    // it will look something like COM2_none: {BIZ2_A1: 802, BIZ2_D1: 802, ....}
    // because we can travel from COM2 to BIZ2 with bus service A1 and D1.
    for (let adjacentBusStop in input_graph[elem]) {
      let new_value = {};
      input_graph[elem][adjacentBusStop]["services"].forEach((service) => {
        new_value[adjacentBusStop + "_" + service] =
          input_graph[elem][adjacentBusStop]["distance"];
      });

      if (!graph[elem + "_none"]) {
        graph[elem + "_none"] = new_value;
      } else {
        graph[elem + "_none"] = Object.assign(graph[elem + "_none"], new_value);
      }
    }
  });

  Object.keys(input_graph).forEach((elem) => {
    //create _service keys
    //once we have created the _none keys, we can loop through the 'input_graph' to first find the destination
    // and its corresponding bus services available for us to get to that destination.
    // Then, we can append the 'destination_none' value into the 'graph' with the 'destination_service' as the key.
    for (let adjacentBusStop in input_graph[elem]) {
      input_graph[elem][adjacentBusStop]["services"].forEach((service) => {
        graph[adjacentBusStop + "_" + service] = Object.assign(
          {},
          graph[adjacentBusStop + "_none"]
        );
      });
    }
  });

  return graph;
};

// To create a file called dijkstraGraphForTransfers use the function below and comment out line 53. After you are done, undo all changes.
// fs.writeFile(
//   "../data/dijkstraGraphForTransfers.json",
//   JSON.stringify(create_dijkstraGraphforTransfers(dijkstraGraphWithService)),
//   (err) => {
//     if (err) return console.log(err);
//     console.log("File has been successfully written!");
//   }
// );

module.exports = create_dijkstraGraphforTransfers;
