import {
  CustomizationButton,
  CustomizationButton2,
  CustomizationSection,
  AlarmButton,
  GetBusStopButton,
} from "./MobileCustomizationElements";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import map from "../../data/map.json";
import data from "../../data/vacation.json";
import { distance } from "../MapSideBar/Customization/functions";
import busStops from "../../data/busStops.json";

const findNearest = async () => {
  let arr = [];
  function getLongAndLat() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }
  let obj = await getLongAndLat();
  busStops.forEach((busStop) => {
    const dist = distance(
      obj.coords.latitude,
      obj.coords.longitude,
      busStop.latitude,
      busStop.longitude
    );
    if (dist <= 0.2) {
      // distance is less than 200 metres.
      arr.push(busStop.caption);
    }
  });

  if (arr.length === 0) {
    alert("No bus stops are near you.");
  } else if (arr.length === 1) {
    alert("Closest bus stop near you is: " + arr[0]);
  } else if (arr.length === 2) {
    alert("Closest bus stop near you are: " + arr[0] + " and " + arr[1]);
  } else {
    alert(
      "The closest bus stops near you are: " +
        arr.slice(0, arr.length - 1).join(", ") +
        " and " +
        arr[arr.length - 1]
    );
  }
};

const MobileCustomization = ({
  setTime,
  setDate,
  setMonth,
  setYear,
  setDay,
  setIncludeArrivalTime,
  setSelectedRoute,
  current,
  destination,
}) => {
  const [departureSetting, setDepartureSetting] = useState(true);
  const [alarm, setAlarm] = useState(false);
  const history = useHistory();

  const handleSelect = (name) => {
    if (name === "Depart Later") {
      setDepartureSetting(false);
      setIncludeArrivalTime(false);
      setSelectedRoute(null);
      handleDateInput();
    } else {
      setDepartureSetting(true);
      const obj = new Date();
      const today = obj.getDay();
      let [hour, minute] = obj.toLocaleTimeString("it-IT").split(/:| /);
      let [monthNow, dateNow, yearNow] = obj
        .toLocaleDateString("en-US")
        .split("/");
      setTime(hour + minute);
      setDay(today);
      setDate(parseInt(dateNow));
      setMonth(parseInt(monthNow));
      setYear(parseInt(yearNow));
      setIncludeArrivalTime(true);
      setSelectedRoute(null);
      const year = parseInt(yearNow);
      const month = parseInt(monthNow);
      const date = parseInt(dateNow);
      const day = today;
      const time = hour + minute;
      const category =
        data.reduce((x, y) => {
          if (x !== null) {
            return x;
          } else if (y["duration-year"].includes(year)) {
            if (
              y["duration-month"][0] < month &&
              month < y["duration-month"][1]
            ) {
              return "vacation";
            } else if (
              y["duration-month"][0] === month ||
              month === y["duration-month"][1]
            ) {
              return y["duration-date"][0] <= date &&
                date <= y["duration-date"][1]
                ? "vacation"
                : "term";
            } else {
              return "term";
            }
          } else {
            return null;
          }
        }, null) + (day === 0 ? "-sun/ph" : day === 6 ? "-sat" : "-weekdays");
      history.push(
        "/map/routeRecommedation?start=" +
          encodeURIComponent(map[current]) +
          "&end=" +
          encodeURIComponent(map[destination]) +
          "&time=" +
          encodeURIComponent(time) +
          "&date=" +
          encodeURIComponent(category)
      );
    }
  };

  const handleTimeInput = () => {
    const userTime = prompt(
      "Type in your time here (format: hhmm)." +
        "\nFor example, 12:34 am would be 0034 and 12:34 pm would be 1234."
    );

    if (userTime === null) {
      handleSelect("Depart Now");
      return null;
    } else if (isNaN(parseInt(userTime))) {
      alert("Input is not a number. Please try again.");
      return handleTimeInput() === null ? handleSelect("Depart Now") : "";
    } else if (userTime.length !== 4) {
      alert("Input is not of the correct length. Please try again.");
      return handleTimeInput() === null ? handleSelect("Depart Now") : "";
    } else if (
      parseInt(userTime.substring(0, 2)) < 0 ||
      parseInt(userTime.substring(0, 2)) > 23
    ) {
      alert("Hour is not between 00 and 23 inclusive. Please try again.");
      return handleTimeInput() === null ? handleSelect("Depart Now") : "";
    } else if (
      parseInt(userTime.substring(0, 2)) < 0 ||
      parseInt(userTime.substring(2, 4)) > 59
    ) {
      alert("Mnute is not between 00 and 59 inclusive. Please try again.");
      return handleTimeInput() === null ? handleSelect("Depart Now") : "";
    } else {
      return userTime;
    }
  };

  const handleDateInput = () => {
    const userDate = prompt(
      "Type in your date here (format: ddmmyyyy)." +
        " \n For example, 4 Jul 2021 would be 04072021. \n*Note: We can only compute between the year 2021 to 2024 inclusive." +
        " Please do not put a year greater than 2024."
    );

    if (userDate === null) {
      handleSelect("Depart Now");
      return null;
    } else if (userDate === "") {
      alert("You have no input. Please try again.");
      return handleDateInput() === null ? handleSelect("Depart Now") : "";
    } else if (isNaN(parseInt(userDate))) {
      alert("Input is not a number. Please try again.");
      return handleDateInput() === null ? handleSelect("Depart Now") : "";
    } else if (userDate.length !== 8) {
      alert("Input is not of the correct length. Please try again.");
      return handleDateInput() === null ? handleSelect("Depart Now") : "";
    } else if (
      parseInt(userDate.substring(4, 8)) > 2024 ||
      parseInt(userDate.substring(4, 8)) < 2021
    ) {
      alert("Input is not between 2021 and 2024. Please try again.");
      return handleDateInput() === null ? handleSelect("Depart Now") : "";
    } else {
      const obj = new Date(
        userDate.substring(4, 8) +
          "-" +
          userDate.substring(2, 4) +
          userDate.substring(0, 2)
      );
      setDay(obj.getDay());
      setYear(parseInt(userDate.substring(4, 8)));
      setMonth(parseInt(userDate.substring(2, 4)));
      setDate(parseInt(userDate.substring(0, 2)));
      const res = handleTimeInput();
      if (res === null) {
        handleSelect("Depart Now");
      } else {
        setTime(parseInt(res));
        alert(
          `Date and time has been updated. Press get route/Go to see the route recommendations for ${userDate} at ${res}`
        );
      }
    }
  };

  return (
    <CustomizationSection>
      <CustomizationButton
        departureSetting={departureSetting}
        onClick={() => handleSelect("Depart Now")}
      >
        Now
      </CustomizationButton>
      <CustomizationButton2
        departureSetting={departureSetting}
        onClick={() => handleSelect("Depart Later")}
      >
        Later
      </CustomizationButton2>
      <GetBusStopButton onClick={findNearest}>
        Nearest Bus Stop
      </GetBusStopButton>
      <AlarmButton alarm={alarm} onClick={() => setAlarm(!alarm)}>
        Alarm
      </AlarmButton>
    </CustomizationSection>
  );
};

export default MobileCustomization;
