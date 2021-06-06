//Each element in the path array will be in the form busStop_busService
const findDuration = (path, graph) => {
  let duration;
  for (let i = 0; i < path.length; i++) {
    if (i == 0 || i == 1) {
      const index = path[0].indexOf("_");
      const busStop = path[0].substring(0, index);
      const index2 = path[1].indexOf("_");
      const nextBusStop = path[1].substring(0, index2);
      duration = parseInt(graph[busStop][nextBusStop]["duration"]);
    } else {
      const index = path[i - 1].indexOf("_");
      const busStop = path[i - 1].substring(0, index);
      const index2 = path[i].indexOf("_");
      const nextBusStop = path[i].substring(0, index2);
      duration += parseInt(graph[busStop][nextBusStop]["duration"]);
    }
  }
  return duration;
};

module.exports = findDuration;
