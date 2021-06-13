/* global google */
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";
import busStops from "../../data/busStops.json";
import { useState, useEffect } from "react";
import icon from "../../images/icon.png";
import mapStyle from "./mapStyle.js";

function MapDirectionsRenderer(props) {
  const [directions, setDirections] = useState(() => null);
  const [error, setError] = useState(() => null);

  useEffect(() => {
    console.log(1);
    const { places, travelMode } = props;
    
    const waypoints = places.map((p) => ({
      location: { lat: p["latitude"], lng: p["longitude"] },
      stopover: true,
    }));
       
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
   
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, [props]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    directions && (
      <DirectionsRenderer
        directions={directions}
        options={{
          polylineOptions: {
            strokeWeight: 7,
            strokeOpacity: 0.8,
            strokeColor: "aquamarine",
          },
          suppressMarkers: true,
        }}
      />
    )
  );
}

const RenderMap = ({ route }) => {
  console.log(2);
  //for markers and info window.
  const [selectedBusStop, setSelectedBusStop] = useState(() => null);
  let places = [];
  route.forEach((location) => {
    busStops.forEach((busStop) => {
      if (busStop["name"] === location.substring(0, location.indexOf('_'))) {
        places.push(busStop);
      }
    });
  });
  
  return ( 
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 1.296643, lng: 103.776398 }}
      defaultOptions={{ styles: mapStyle, clickableIcons: false }}
    >
      {route.length !== 0 ? <MapDirectionsRenderer
        places={places}
        travelMode={window.google.maps.TravelMode.DRIVING}
      /> :""}
      {places.map((busStop) => {
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
