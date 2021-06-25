const express = require("express");
const dijkstraGraphWithService = require("./data/dijkstraGraphWithService");
const routeRecommendation = require("./repo/routeRecommendation");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const getArrivalTime = require('./repo/getArrivalTime');

app.use(cors());

app.get("/api/routeRecommedation", (req, res) => {
  console.log('routeRecommendation function called');
  res.json(
    routeRecommendation(
      req.query.start,
      req.query.end,
      req.query.time,
      req.query.date,
      dijkstraGraphWithService,
      150,
      1000,
      12
    )
  );
});

app.get("/api/getArrivalTime", async (req, res) => {
  console.log('getArrivalTime function called');
  const result = await getArrivalTime(
    req.query.busStop,
    req.query.busService
  );
  res.json(
    result
  );
});

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
