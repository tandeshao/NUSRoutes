import { HeroContainer, HeroBg, HeroContent, HeroH1 } from "./ProfileElements";
import { useState, useEffect } from "react";

const FavouritesSection = () => {
  const [alarmToggle] = useState(true);
  const [alarm, setAlarm] = useState(false);
  const [location, setLocation] = useState({
    loaded: false,
    lat: "",
    lng: "",
  });
  const [dest] = useState("AS7");

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (alarmToggle) {
      if (!alarm) {
        if (!("geolocation" in navigator)) {
          onError({
            code: 0,
            message: "Geolocation not supported",
          });
        }
        const id = setTimeout(
          () => navigator.geolocation.getCurrentPosition(onSuccess, onError),
          10000
        );

        console.log("Far from destination");
        if (location.loaded) {
          fetch(
            "http://localhost:5000" +
              "/proximityAlarm?" +
              "lat=" +
              location.lat +
              "&" +
              "lng=" +
              location.lng +
              "&" +
              "dest=" +
              dest
          )
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                setAlarm(true);
                clearTimeout(id);
              }
            });
        }
      } else {
        console.log("Arriving at destination");
      }
    }

    return () => {
      clearTimeout();
    };
  }, [dest, location, alarmToggle, alarm, setAlarm]);

  return (
    <HeroContainer id="home">
      <HeroBg />
      <HeroContent>
        <HeroH1>Favourites</HeroH1>
        <div style={{ color: "white" }}>
          {location.lat !== ""
            ? `Lat ${location.lat}, Lng ${location.lng}`
            : "Location data not available yet"}
        </div>
        {alarm ? (
          <div style={{ color: "green" }}> TRUE </div>
        ) : (
          <div style={{ color: "red" }}> FALSE </div>
        )}
        {console.log(alarm)}
      </HeroContent>
    </HeroContainer>
  );
};

export default FavouritesSection;
