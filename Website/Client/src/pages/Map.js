import RenderMap from "../components/RenderMap";
import MapSideBar from "../components/MapSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileMapView from "../components/MobileMapView";
import {
  PageContainer,
  SideBarContainer,
  MapContainer,
  ArrowLeftButton,
  ArrowRightButton,
} from "./MapElements.js";
import { motion } from "framer-motion";
import { animationTwo, transition } from "./pageAnimation";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const Map = () => {
  
  const [state, setState] = useState({
    bottom: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


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
  const anchor = "bottom";
  

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
        {window.innerWidth > 400 || window.innerHeight > 820 ? (
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

        {window.innerWidth <= 400 && window.innerHeight < 820 ? (
          <>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
             <MapSideBar
                routeRecommendations={routeRecommendations}
                setRoute={setRoute}
                startAndEnd={[start, end]}
                route={route}
              />
          </SwipeableDrawer>
            
          <MobileMapView toggle={toggleDrawer(anchor, true)} />
          </>
        ) : (
          <SideBarContainer $sidebar={sidebar}>
            <MapSideBar
              routeRecommendations={routeRecommendations}
              setRoute={setRoute}
              startAndEnd={[start, end]}
              route={route}
            />
          </SideBarContainer>
        )}
      </PageContainer>
    </motion.div>
  );
};

export default Map;
