const detailedGraph = require('../data/detailedGraph');
const fs = require('fs');

const create_djikstraGraph = (graph) => {
    for (const key in graph) {
        const arr = graph[key];
        let res = {};
        arr.forEach(element => {
            res[element.destination] = element["data"][0].distanceValue;
        });
        graph[key] = res;
    }
    return graph;
}

fs.writeFile("../data/djikstraGraph.json", JSON.stringify(create_djikstraGraph(detailedGraph)), (err) => {
    if (err) return console.log(err);
    console.log("File has been successfully written!");
});