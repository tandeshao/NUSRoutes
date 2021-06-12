const node_djikstra = require("node-dijkstra");
const graph = require('../data/dijkstraGraph.json')

const djikstra = (start, end, graph) => {
  const obj = new node_djikstra(graph);
  return obj.path(start, end, { cost: true });
};

//console.log('PGPT', 'KV', graph);
module.exports = djikstra;


