const dijkstraGraphWithService = require("../data/dijkstraGraphWithService");
const create_dijkstraGraphforTransfers = require("./create_dijkstraGraphForTransfers");
const unavailableServices = require("./unavailableServices");
const busServices = require("../data/busServices");
const findDistance = require("./findDistance");
const findDuration = require("./findDuration");
const addTime = require("./addTime");
const heapq = require("heapq");

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
      StartingTime: null,
      ArrivalTime: null,
      Transfers: null,
      Duration: null,
      Distance: null,
      Cost: null,
      Path: null,
    };
  } else {
    shortestPath.reverse();
    const res = findDuration(
      shortestPath,
      dijkstraGraphWithService,
      durationPerTransfer
    );
    const duration = Math.ceil(res[0] + shortestPath.length * 0.67);
    const transfers = res[1];

    results = {
      StartingTime: time,
      ArrivalTime: addTime(parseInt(time), duration),
      Transfers: transfers,
      //duration = duration of going to each stop + a 40s "stop time" given to each stop.
      //40s = 40/60 = 2/3 estimated to be 0.67.
      Duration: duration,
      Distance: findDistance(shortestPath, dijkstraGraphWithService),
      Cost: costs[end],
      Path: shortestPath,
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
    return [
      {
        Path: `Start: ${start} and End: ${end} is the same bus stop`,
        Cost: -1,
      },
    ];
  } else if (!graph[start] || !graph[end]) {
    console.log(
      `Start: ${start} or End: ${end} cannot be found. Probably bus stops doesn't exist.`
    );
    return [
      { Path: `Start: ${start} or End: ${end} cannot be found.`, Cost: -1 },
    ];
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

    let result = [];
    const comparator = (x, y) => x["Cost"] < y["Cost"];
    arr.forEach((x) => {
      if (x["Path"] !== null) {
        heapq.push(result, x, comparator);
      }
    });

    if (result.length === 0) {
      return [{ String: "No available path could be found.", Path: [],Cost: -1 }];
    } else {
      return result;
    }
  }
};

module.exports = routeRecommendation;
