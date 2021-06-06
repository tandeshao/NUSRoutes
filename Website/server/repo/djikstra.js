const node_djikstra = require("node-dijkstra");

const djikstra = (start, end, graph) => {
  const obj = new node_djikstra(graph);
  return obj.path(start, end, { cost: true });
};

module.exports = djikstra;


