const express = require("express");
const dijkstraGraphWithService = require("./data/dijkstraGraphWithService");
const routeRecommendation = require("./repo/routeRecommendation");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");

app.use(cors());

app.get("/api/routeRecommedation", (req, res) => {
  res.json(
    routeRecommendation(
      req.query.start,
      req.query.end,
      req.query.time,
      req.query.date,
      dijkstraGraphWithService,
      150,
      5000,
      12
    )
  );
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
