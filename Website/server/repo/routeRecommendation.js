const dijkstraGraphWithService = require("../data/dijkstraGraphWithService");
const create_dijkstraGraphforTransfers = require("./create_dijkstraGraphForTransfers");
const unavailableServices = require("./unavailableServices");
const busServices = require("../data/busServices");
const findDistance = require("./findDistance");
const findDuration = require("./findDuration");

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

const dijkstra = (
  start,
  end,
  time,
  date,
  dijkstraGraphWithService,
  dijkstraGraph,
  costPerStop,
  costPerTransfer,
  durationPerTransfer
) => {
  const unavailable_service = unavailableServices(
    time,
    date,
    Object.assign([], busServices)
  );
  Object.keys(dijkstraGraph[start]).forEach((x) => {
    const index = x.indexOf("_");
    const busService = x.substring(index + 1, x.length);
    if (unavailable_service.includes(busService)) {
      delete dijkstraGraph[start][x];
    } else {
      dijkstraGraph[start][x] = dijkstraGraph[start][x] + costPerStop;
    }
  });
  //here
  const costs = {};
  Object.assign(costs, dijkstraGraph[start]);
  const parents = { end: null };
  for (let child in dijkstraGraph[start]) {
    parents[child] = start;
  }
  const processed = [];
  let node = lowestCostNode(costs, processed);
  while (node) {
    let cost = costs[node];
    let children = dijkstraGraph[node];
    for (let n in children) {
      const indexNode = node.indexOf("_");
      const indexChild = n.indexOf("_");
      const currBusService = node.substring(indexNode + 1, node.length);
      const nextBusService = n.substring(indexChild + 1, n.length);
      let newCost;

      if (unavailable_service.includes(nextBusService)) {
        continue;
      } else if (currBusService == nextBusService) {
        newCost = cost + children[n] + costPerStop;
      } else if (currBusService !== nextBusService) {
        newCost = cost + children[n] + costPerStop + costPerTransfer;
      }

      if (!costs[n] || costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  //here

  let shortestPath = [end];
  let parent = parents[end];
  let results;
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  if (shortestPath.length == 1) {
    results = {
      duration: null,
      distance: null,
      cost: null,
      path: null,
    };
  } else {
    shortestPath.reverse();
    results = {
      timeFromStart: time,
      //duration = duration of going to each stop + a 40s "stop time" given to each stop.
      //40s = 40/60 = 2/3 estimated to be 0.67.
      duration:
        Math.ceil(findDuration(
          shortestPath,
          dijkstraGraphWithService,
          durationPerTransfer
        ) + shortestPath.length * 0.67),
      distance: findDistance(shortestPath, dijkstraGraphWithService),
      cost: costs[end],
      path: shortestPath,
    };
  }
  return results;
};

const routeRecommendation = (
  start,
  end,
  time,
  date,
  graph,
  costPerStop,
  costPerTransfer,
  durationPerTransfer
) => {
  if (start == end) {
    console.log(
      `Start: ${start} and End: ${end} is the same bus stop, no path can be found.`
    );
    return `Start: ${start} and End: ${end} is the same bus stop`;
  } else if (!graph[start] || !graph[end]) {
    console.log(
      `Start: ${start} or End: ${end} cannot be found. Probably bus stops doesn't exist.`
    );
    return `Start: ${start} or End: ${end} cannot be found.`;
  } else {
    let graphForTransfers = create_dijkstraGraphforTransfers(graph);
    let arr = [];
    Object.keys(graphForTransfers).forEach((x) => {
      if (x.indexOf(end) !== -1 && x !== end + "_none") {
        graphForTransfers = create_dijkstraGraphforTransfers(graph);
        arr.push(
          dijkstra(
            start + "_none",
            x,
            time,
            date,
            dijkstraGraphWithService,
            graphForTransfers,
            costPerStop,
            costPerTransfer,
            durationPerTransfer
          )
        );
      }
    });

    let lowestCost = Infinity;
    let result = [];
    arr.forEach((x) => {
      if (x.cost !== null && x.cost < lowestCost) {
        lowestCost = x.cost;
      }
    });

    arr.forEach((x) => {
      if (x.cost === lowestCost) {
        result.push(x);
      }
    });

    if (result.length === 0) {
      result.push({ path: "No available path could be found." });
      return result;
    } else {
      return result;
    }
  }
};

// console.log(
//   dijkstra(
//     "COMCEN_none",
//     "JP-SCH-16151_C",
//     1300,
//     "term-weekdays",
//     dijkstraGraphWithService,
//     create_dijkstraGraphforTransfers(dijkstraGraphWithService),
//     150,
//     5000,
//     12
//   )
// );

// console.log(
//   dijkstra(
//     "COM2_none",
//     "BIZ2_D1",
//     1300,
//     "term-weekdays",
//     dijkstraGraphWithService,
//     create_dijkstraGraphforTransfers(dijkstraGraphWithService),
//     150,
//     5000,
//     12
//   )
// );
module.exports = routeRecommendation;

// console.log(
//   routeRecommendation(
//     "COMCEN",
//     "JP-SCH-16151",
//     1300,
//     "term-weekdays",
//     dijkstraGraphWithService,
//     150,
//     5000,
//     12
//   )
// );
//COMCEN_A2 --> KR-BT_BTC2 no such journey.
