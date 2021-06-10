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
  costPerTransfer
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

  const costs = dijkstraGraph[start];
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
        delete dijkstraGraph[node][n];
      } else if (currBusService == "none" || currBusService == nextBusService) {
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
      //duration = duration of going to each stop + a 1 min "stop time" given to each stop.
      duration:
        findDuration(shortestPath, dijkstraGraphWithService) +
        shortestPath.length,
      distance: findDistance(shortestPath, dijkstraGraphWithService),
      cost: costs[end],
      path: shortestPath
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
  costPerTransfer
) => {
  if (start == end) {
    console.log(
      `Start: ${start} and End: ${end} is the same bus stop, no path can be found.`
    );
    return `Start: ${start} and End: ${end} is the same bus stop`;
  } else if (!graph[start] || !graph[end]) {
    console.log(
      `Start: ${start} or End: ${end} cannot be found. Probably bus stops doesn't exist or no such bus service is able to get you there currently.`
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
            costPerTransfer
          )
        );
      }
    });
    
    let lowestCost = Infinity;
    let result = [];
    arr.forEach(x => {
      if (x.cost !== null && x.cost < lowestCost) {
        lowestCost = x.cost;
      }
    })

    arr.forEach(x => {
      if (x.cost === lowestCost) {
        result.push(x);
      }
    })

    return result;
  } 
};

//console.log(routeRecommendation('AS7', 'BIZ2', 1929, 'vacation-weekdays', dijkstraGraphWithService, 150, 5000));
module.exports = routeRecommendation;

