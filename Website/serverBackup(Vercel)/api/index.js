const proximityAlarm = require("./proximityAlarm");
const express = require("express");
const dijkstraGraphWithService = require("../data/dijkstraGraphWithService");
const routeRecommendation = require("./routeRecommendation");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const getArrivalTime = require("./getArrivalTime");
const data = require("../data/vacation.json");

app.use(cors());

app.get("/api/proximityAlarmV", (req, res) => {
  console.log("proxmityAlarm function called");
  res.json(proximityAlarm(req.query.lat, req.query.lng, req.query.dest));
});

app.get("/api/routeRecommedationV", (req, res) => {
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

app.get("/api/getArrivalTimeV", async (req, res) => {
  console.log("getArrivalTime function called");
  const result = await getArrivalTime(
    req.query.busStop,
    req.query.busService,
    req.query.busstopcode
  );
  res.json(result);
});

app.get("/api/telegramRouteRecommendationV", async (req, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
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

app.listen(port, () => {
  console.log(`Listening to ${port}...`);
});
