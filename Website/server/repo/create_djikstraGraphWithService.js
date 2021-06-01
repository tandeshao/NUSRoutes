const djikstraGraph = require('../data/djikstraGraph');
const fs = require('fs');
const find_service = require('./find_service');

const create_djikstraGraphWithService = (graph) => {
    for (let key in graph) {
        for (let val in graph[key]) {
            const path = [key, val];
            const services = find_service(path)[0][0];
            const res = {"distance": graph[key][val], services};
            graph[key][val] = res;
        }
    }
    return graph;
}


fs.writeFile("../data/djikstraGraphWithService.json", JSON.stringify(create_djikstraGraphWithService(djikstraGraph)), (err) => {
    if (err) return console.log(err);
    console.log("File has been successfully written!");
});