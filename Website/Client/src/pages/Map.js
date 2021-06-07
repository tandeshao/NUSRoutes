import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WrappedMap from "../components/RenderMap";

const Map = () => {
  // let { string } = useParams();
  // const [routeRecommedation, setRouteRecommendation] = useState(
  //   "Loading route recommendation..."
  // );

  // const search = window.location.search;
  // const params = new URLSearchParams(search);
  // let start = params.get("start");
  // let end = params.get("end");
  // let time = params.get("time");
  // let date = params.get("date");

  // useEffect(() => {
  //   fetch(
  //     "http://localhost:5000/api/" +
  //       string +
  //       "?" +
  //       "start=" +
  //       start +
  //       "&" +
  //       "end=" +
  //       end +
  //       "&" +
  //       "time=" +
  //       time +
  //       "&" +
  //       "date=" +
  //       date
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setRouteRecommendation(JSON.stringify(data)))
  //     .catch((error) =>
  //       setRouteRecommendation(
  //         `Unable to retrieve route recommendation. ${error}`
  //       )
  //     );
  // }, [string, start, end, time, date]);

  return (
    <div style={{display: 'flex'}}>
      <p style={{width: '20vw', height: '100vh'}}> side bar here </p>
      <div style={{ width: "80vw", height: "100vh", float: "right" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBRoAzyi2e-1RNeC-S-F3m6db6oMvAAluE`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </div>
  );
};

export default Map;
