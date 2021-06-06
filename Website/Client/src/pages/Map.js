import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Map = () => {
  let { string } = useParams();
  const [routeRecommedation, setRouteRecommendation] = useState(
    "Loading route recommendation..."
  );

  const search = window.location.search;
  const params = new URLSearchParams(search);
  let start = params.get("start");
  let end = params.get("end");
  let time = params.get("time");
  let date = params.get("date");

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/" +
        string +
        "?" +
        "start=" +
        start +
        "&" +
        "end=" +
        end +
        "&" +
        "time=" +
        time +
        "&" +
        "date=" +
        date
    )
      .then((response) => response.json())
      .then((data) => setRouteRecommendation(JSON.stringify(data)))
      .catch((error) =>
        setRouteRecommendation(
          `Unable to retrieve route recommendation. ${error}`
        )
      );
  }, [string, start, end, time, date]);

  return (
    <p>
      {routeRecommedation}
    </p>
  );
};

export default Map;
