/* global google */
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyle from "./mapStyle";
import { useState, useEffect, useRef } from "react";
import icon from "../../images/icon.png";
import icon2 from "../../images/Picture2.png";
import icon3 from "../../images/Picture3.png";
import busStops from "../../data/busStops.json";
import gpsIcon from "../../images/gpslocation.gif";

const containerStyle = {
  height: "100%",
  transition: "all .25s ease-in-out",
};

function MapDirectionsRenderer(props) {
  const [directions, setDirections] = useState(() => null);
  const [error, setError] = useState(() => null);
  const { places, travelMode } = props;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
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
            console.log(result);
          }
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [places, travelMode]);

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

function RenderMap({ route }) {
  const mapRef = useRef(() => null);
  const center = { lat: 1.296643, lng: 103.776398 };
  const position = useRef(center);
  const [gpsLocation, setGpsLocation] = useState(() => null);
  const [selectedGpsMarker, setSelectedGpsMarker] = useState(() => null);
  function handleLoad(map) {
    mapRef.current = map;
  }

  const [selectedBusStop, setSelectedBusStop] = useState(() => null);
  let places = [];

  route.forEach((location) => {
    busStops.forEach((busStop) => {
      if (busStop["name"] === location.substring(0, location.indexOf("_"))) {
        places.push(busStop);
      }
    });
  });

  const onSuccess = (location) => {
    setGpsLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const onError = (error) => {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  };

  useEffect(() => {
    console.log("useEffect called")
    const intervalId = setInterval(() => {
      console.log("interval called")
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const { REACT_APP_API_KEY } = process.env;
  return (
    <LoadScript googleMapsApiKey={REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={handleLoad}
        center={position.current}
        zoom={16}
        options={{ styles: mapStyle, clickableIcons: false, disableDefaultUI: true }}
      >
        {places.length !== 0 && (
          <MapDirectionsRenderer
            places={places}
            travelMode={window.google.maps.TravelMode.DRIVING}
          />
        )}
        {places.map((busStop, index) => {
          if (index === 0) {
            return (
              <Marker
                key={busStop["caption"]}
                position={{
                  lat: busStop["latitude"],
                  lng: busStop["longitude"],
                }}
                onClick={() => {
                  setSelectedBusStop(busStop);
                }}
                icon={{
                  url: icon2,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            );
          } else if (index === places.length - 1) {
            return (
              <Marker
                key={busStop["caption"]}
                position={{
                  lat: busStop["latitude"],
                  lng: busStop["longitude"],
                }}
                onClick={() => {
                  setSelectedBusStop(busStop);
                }}
                icon={{
                  url: icon3,
                  scaledSize: new window.google.maps.Size(28, 42),
                }}
              />
            );
          } else {
            return (
              <Marker
                key={busStop["caption"]}
                position={{
                  lat: busStop["latitude"],
                  lng: busStop["longitude"],
                }}
                onClick={() => {
                  setSelectedBusStop(busStop);
                }}
                icon={{
                  url: icon,
                  scaledSize: new window.google.maps.Size(27, 35),
                }}
              />
            );
          }
        })}

        {gpsLocation && (
          <Marker
            position={{ lat: gpsLocation.lat, lng: gpsLocation.lng }}
            icon={{
              url: gpsIcon,
              scaledSize: new window.google.maps.Size(50, 60),
            }}
            onClick={() => setSelectedGpsMarker(true)}
          />
        )}

        {selectedGpsMarker && (
          <InfoWindow
            position={{ lat: gpsLocation.lat, lng: gpsLocation.lng }}
            onCloseClick={() => setSelectedGpsMarker(null)}
          >
            <div>
              <h4> Your current location. </h4>
            </div>
          </InfoWindow>
        )}

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
    </LoadScript>
  );
}

export default RenderMap;
