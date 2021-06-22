import WrappedMap from "../components/RenderMap";
import MapSideBar from "../components/MapSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  PageContainer,
  SideBarContainer,
  MapContainer,
  ArrowLeftButton,
  ArrowRightButton,
} from "./MapElements.js";

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

  console.log(onHover);
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
          {
            String: `Unable to retrieve route recommendation. ${error}`,
            Path: [],
            Cost: -1,
          },
        ])
      );
  }, [string, start, end, time, date, REACT_APP_DOMAIN]);

  return (
      <PageContainer>
        <SideBarContainer sideBar={sideBar}>
          <MapSideBar
            routeRecommendations={routeRecommendations}
            setRoute={setRoute}
            startAndEnd={[start, end]}
            route={route}
          />
        </SideBarContainer>
        <MapContainer sideBar={sideBar}>
          {sideBar ? (
            <ArrowLeftButton
              sideBar={sideBar}
              onHover={onHover}
              onMouseEnter={() => setOnHover(true)}
              onMouseLeave={() => setOnHover(false)}
              onClick={() => {
                setSideBar((prev) => !prev);
                setOnHover(false);
              }}
            />
          ) : (
            <ArrowRightButton
              sideBar={sideBar}
              onHover={onHover}
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
        </MapContainer>
      </PageContainer>
  );
};

export default Map;
