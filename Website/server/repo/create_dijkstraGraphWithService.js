const djikstraGraph = require('../data/dijkstraGraph');
const fs = require('fs');
const find_service = require('./find_service');
const busServices = require('../data/busServices');
const detailedGraph = require('../data/detailedGraph');

const create_dijkstraGraphWithService = (graph) => {
    for (let key in graph) {
        for (let val in graph[key]) {
            detailedGraph[key].forEach(x => {
                if (x["destination"] == val) {
                    const path = [key, val];
                    const services = find_service(path, busServices)[0][0];
                    const res = {"distance": graph[key][val], services, 
                    "duration": x["data"][0]["duration"]};
                    graph[key][val] = res;
                }

            });
            
        }
    }
    return graph;
}


fs.writeFile("../data/dijkstraGraphWithService.json", JSON.stringify(create_dijkstraGraphWithService(djikstraGraph)), (err) => {
    if (err) return console.log(err);
    console.log("File has been successfully written!");
});