import WrappedMap from "../components/RenderMap";
import MapSideBar from "../components/MapSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

const Map = () => {
  const [onHover, setOnHover] = useState(() => false);
  const [sideBar, setSideBar] = useState(() => true);
  const { REACT_APP_API_KEY, REACT_APP_DOMAIN } = process.env;
  let { string } = useParams();
  const [routeRecommendations, setRouteRecommendations] = useState(() => [
    { Path: [] },
  ]);
  const [route, setRoute] = useState(() => []);
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
        setRoute(data[0]["Path"]);
      })
      .catch((error) =>
        setRouteRecommendations([
          { String: `Unable to retrieve route recommendation. ${error}` , Path: [], Cost: -1},
        ])
      );
  }, [string, start, end, time, date, REACT_APP_DOMAIN]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: sideBar ? "30vw" : "0vw",
          height: "100vh",
          zIndex: "1",
          transition: "all .15s ease-in-out",
        }}
      >
        <MapSideBar
          routeRecommendations={routeRecommendations}
          setRoute={setRoute}
          startAndEnd={[start, end]}
          route={route}
        />
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: "1",
        }}
      >
        {sideBar ? (
          <ArrowLeftRoundedIcon
            style={{
              position: "absolute",
              zIndex: "2",
              fontSize: "100px",
              top: "50vh",
              color: "black",
              left: sideBar ? "23vw" : "0vw",
              cursor: "pointer",
              backgroundColor: "#DFCCB7",
              width: "1vw",
              height: onHover ? "6vh" : "4vh",
              transition: "background 2s",
            }}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => {
              setSideBar((prev) => !prev);
              setOnHover(false);
            }}
          />
        ) : (
          <ArrowRightRoundedIcon
            style={{
              position: "absolute",
              zIndex: "2",
              fontSize: "100px",
              top: "50vh",
              color: "black",
              left: sideBar ? "23vw" : "0vw",
              cursor: "pointer",
              backgroundColor: "#DFCCB7",
              width: "1vw",
              height: onHover ? "6vh" : "4vh",
              transition: "background 2s",
            }}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => {
              setSideBar((prev) => !prev);
              setOnHover(false);
            }}
          />
        )}
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_APP_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          route={route}
          style={{ transition: "all .15s ease-in-out" }}
        />
      </div>
    </div>
  );
};

export default Map;
