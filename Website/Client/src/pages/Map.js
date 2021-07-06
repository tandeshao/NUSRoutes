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
        {window.innerWidth > 828 || window.innerHeight > 850 ? (
          sidebar ? (
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
          )
        ) : sidebar ? (
          <ArrowRightButton
            $sidebar={sidebar}
            onClick={() => {
              setSideBar((prev) => !prev);
            }}
          />
        ) : (
          <ArrowLeftButton
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
