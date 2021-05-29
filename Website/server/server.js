const express = require('express');
//const bfs = require('./repo/bfs');
const graph = require('./data/graph.json');
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');

app.use(cors());

app.get('/graph', (req, res) => {
    res.json(graph);
})

app.listen(port, ()=> {
    console.log(`Listening at http://localhost:${port}`);
})