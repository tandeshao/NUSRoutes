const detailedGraph = require('../data/detailedGraph');
const fs = require('fs');

const create_dijkstraGraph = (graph) => {
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

fs.writeFile("../data/dijkstraGraph.json", JSON.stringify(create_dijkstraGraph(detailedGraph)), (err) => {
    if (err) return console.log(err);
    console.log("File has been successfully written!");
});