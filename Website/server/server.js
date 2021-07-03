const express = require("express");
const dijkstraGraphWithService = require("./data/dijkstraGraphWithService");
const routeRecommendation = require("./repo/routeRecommendation");
const proximityAlarm = require("./repo/proximityAlarm");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const getArrivalTime = require("./repo/getArrivalTime");
const data = require("./data/vacation.json");

app.use(cors());

app.get("/api/routeRecommedation", (req, res) => {
  console.log("routeRecommendation function called");
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
  console.log("getArrivalTime function called");
  const result = await getArrivalTime(req.query.busStop, req.query.busService);
  res.json(result);
});

app.get("/api/telegramRouteRecommendation", async (req, res) => {
  console.log("telegram RouteRecommendation function called");
  const obj = new Date();
  const [hour, minute] = obj.toLocaleTimeString("it-IT").split(/:| /);
  let now = parseInt(hour + minute);
  let [month, date, year] = obj.toLocaleDateString("en-US").split("/");
  const day = obj.getDay();
  const category =
    data.reduce((x, y) => {
      if (x !== null) {
        return x;
      } else if (y["duration-year"].includes(parseInt(year))) {
        if (
          y["duration-month"][0] < parseInt(month) &&
          parseInt(month) < y["duration-month"][1]
        ) {
          return "vacation";
        } else if (
          y["duration-month"][0] === parseInt(month) ||
          parseInt(month) === y["duration-month"][1]
        ) {
          return y["duration-date"][0] <= parseInt(date) &&
            parseInt(date) <= y["duration-date"][1]
            ? "vacation"
            : "term";
        } else {
          return "term";
        }
      } else {
        return null;
      }
    }, null) +
    (parseInt(day) === 0
      ? "-sun/ph"
      : parseInt(day) === 6
      ? "-sat"
      : "-weekdays");

  res.json(
    routeRecommendation(
      req.query.start,
      req.query.end,
      now,
      category,
      dijkstraGraphWithService,
      150,
      1000,
      12
    )
  );
});

app.get("/proximityAlarm", (req, res) => {
  console.log("proxmityAlarm function called");
  var dest = req.query.dest;
  const result = proximityAlarm(req.query.lat, req.query.lng, dest);
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
