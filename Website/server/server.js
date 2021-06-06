const express = require("express");
const dijkstraGraphWithService = require("./data/dijkstraGraphWithService");
const routeRecommendation = require("./repo/routeRecommendation");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");

app.use(cors());

app.get("/api/routeRecommedation", (req, res) => {
  res.send(
    routeRecommendation(
      req.query.start,
      req.query.end,
      req.query.time,
      req.query.date,
      dijkstraGraphWithService,
      150,
      5000
    )
  );
  
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

let start = "PGPT";
let end = "COM2";
let time = 1700;
let date = "term-weekdays";
let myUrl = "http://localhost:5000/api/routeRecommedation?start=" + encodeURIComponent(start) + '&end=' + encodeURIComponent(end) + '&time=' + encodeURIComponent(time) + '&date=' + encodeURIComponent(date);

console.log(myUrl);