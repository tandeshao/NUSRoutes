import RenderMap from "../components/RenderMap";
import MapSideBar from "../components/MapSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useWindowDimensions from "../useWindowDimensions";
import MapNavbar from "../components/MapNavbar";
import {
  PageContainer,
  SideBarContainer,
  MapContainer,
  ArrowLeftButton,
  ArrowRightButton,
} from "./MapElements.js";
import { motion } from "framer-motion";
import { animationTwo, transition } from "./pageAnimation";
import Drawer from "react-drag-drawer";

const Map = () => {
  const [renderRouteIndex, setRenderRouteIndex] = useState(0);
  const {height, width}= useWindowDimensions();
  const [open, setOpen] = useState(true);
  const toggle = (value) => setOpen(value);
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
  
  console.log(height, width);

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
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={animationTwo}
      transition={transition}
    >
        <PageContainer>
          {width > 450 || height > 900 ? (
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
          ) : (
            ""
          )}
          <MapContainer $sidebar={sidebar}>
            <RenderMap route={route} />
          </MapContainer>

          {width <= 450 && height < 900 ? (
            <>
              <Drawer open={open} onRequestClose={() => toggle(false)}>
              <MapSideBar
                routeRecommendations={routeRecommendations}
                setRoute={setRoute}
                startAndEnd={[start, end]}
                route={route}
                renderRouteIndex={renderRouteIndex}
                setRenderRouteIndex={setRenderRouteIndex}
              />
              </Drawer>
              <MapNavbar open={open} toggle={toggle} style={{ zIndex: "1400" }} />
            </>
          ) : (
            <SideBarContainer $sidebar={sidebar}>
              <MapSideBar
                routeRecommendations={routeRecommendations}
                setRoute={setRoute}
                startAndEnd={[start, end]}
                route={route}
                renderRouteIndex={renderRouteIndex}
                setRenderRouteIndex={setRenderRouteIndex}
              />
            </SideBarContainer>
              />
          )}
        </PageContainer>
    </motion.div>
  );
};

export default Map;
