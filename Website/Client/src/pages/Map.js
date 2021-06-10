import WrappedMap from "../components/RenderMap";
import MapSideBar from "../components/MapSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Map = () => {
  const { REACT_APP_API_KEY, REACT_APP_DOMAIN } = process.env;
  let { string } = useParams();
  const [routeRecommendations, setRouteRecommendations] = useState(() => [{"path": "loading..."}]);
  const [route, setRoute] = useState(() => null);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let start = params.get("start");
  let end = params.get("end");
  let time = params.get("time");
  let date = params.get("date");
  
  useEffect(() => {
    fetch(
      `${REACT_APP_DOMAIN}` +
        "/api/" +
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
      .then((data) => {
        setRouteRecommendations(data);
      })
      .catch((error) =>
        setRouteRecommendations(
          `Unable to retrieve route recommendation. ${error}`
        )
      );
  }, [string, start, end, time, date, REACT_APP_DOMAIN]);
  
  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "100vh",
          zIndex: "2",
        }}
      >
        <MapSideBar
          routeRecommendations={routeRecommendations}
          setRoute={setRoute}
          startAndEnd={[start, end]}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: "1",
        }}
      >
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_APP_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          route={route}
        />
      </div>
    </div>
  );
};

export default Map;
