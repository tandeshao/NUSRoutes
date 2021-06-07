import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import busStops from "../../data/busStops.json";
import { useState, useEffect } from "react";
import icon from "../../images/icon.png";
import mapStyle from "./mapStyle.js";

const RenderMap = () => {
  const [selectedBusStop, setSelectedBusStop] = useState(null);

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 1.296643, lng: 103.776398 }}
      defaultOptions={{ styles: mapStyle, clickableIcons: false }}
    >
      {busStops.map((busStop) => {
        return (
          <Marker
            key={busStop["caption"]}
            position={{ lat: busStop["latitude"], lng: busStop["longitude"] }}
            onClick={() => {
              setSelectedBusStop(busStop);
            }}
            icon={{
              url: icon,
              scaledSize: new window.google.maps.Size(27, 35),
            }}
          />
        );
      })}

      {selectedBusStop && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedBusStop(null);
          }}
          position={{
            lat: selectedBusStop["latitude"],
            lng: selectedBusStop["longitude"],
          }}
        >
          <div>
            <h4> {selectedBusStop["LongName"]} </h4>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(RenderMap));

export default WrappedMap;
