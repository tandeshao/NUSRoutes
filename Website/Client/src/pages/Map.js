import RenderMap from "../components/RenderMap";
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
  console.log("map rendered");
  const [sidebar, setSideBar] = useState(() => true);
  const { REACT_APP_DOMAIN } = process.env;
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
        //reason for the rendering of map pg twice.
        setRoute(data[0]["Path"]);
        setRouteRecommendations(data);
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

  // const onSuccess = (location) => {
  //   console.log(location.coords.latitude, location.coords.longitude);
  //   return {
  //     lat: location.coords.latitude,
  //     lng: location.coords.longitude,
  //   };
  // };

  // const onError = (error) => {
  //   return {
  //     error: {
  //       code: error.code,
  //       message: error.message,
  //     },
  //   };
  // };

  // setInterval(() => {
  //   console.log(1);
  //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  // }, 10000);

  return (
    <PageContainer>
      <SideBarContainer $sidebar={sidebar}>
        <MapSideBar
          routeRecommendations={routeRecommendations}
          setRoute={setRoute}
          startAndEnd={[start, end]}
          route={route}
        />
      </SideBarContainer>
      <MapContainer $sidebar={sidebar}>
        {sidebar ? (
          <ArrowLeftButton
            $sidebar={sidebar}
            onClick={() => {
              setSideBar((prev) => !prev);
            }}
          />
        ) : (
          <ArrowRightButton
            $sidebar={sidebar}
            onClick={() => {
              setSideBar((prev) => !prev);
            }}
          />
        )}
        <RenderMap route={route} />
      </MapContainer>
    </PageContainer>
  );
};

export default Map;
