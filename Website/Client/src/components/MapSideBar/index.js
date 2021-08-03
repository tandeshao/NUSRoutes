// import Customization from "./Customization/";
import InputSection from "./InputSection/";
import Routes from "./Routes/";
import { useState } from "react";
import { MapSideBarContainer, Dividers, Logo, Bar } from "./MapSideBarElements";
import reverseMap from "../../data/reverseMap.json";
import options from "../../data/options.json";
import { IoHomeSharp } from "react-icons/io5";
import MobileCustomization from "../MobileCustomization";
import { CgLoadbar } from "react-icons/cg";

const MapSideBar = ({
  routeRecommendations,
  setRoute,
  route,
  startAndEnd,
  renderRouteIndex,
  setRenderRouteIndex,
  departureSetting,
  setDepartureSetting,
  alarmToggle,
  setAlarmToggle,
  timeInput,
  setTimeInput,
  dateInput,
  setDateInput,
  month,
  setMonth,
  year,
  setYear,
  day,
  setDay,
  sidebar
}) => {
  const [transferredBuses, setTransferredBuses] = useState(() => []);
  const [busArrivalTime, setBusArrivalTime] = useState(() => []);
  const [selectedRoute, setSelectedRoute] = useState(() => null);
  const [includeArrivalTime, setIncludeArrivalTime] = useState(() =>
    departureSetting ? true : false
  );
  const [current, setCurrent] = useState(() => {
    return reverseMap[startAndEnd[0]] === ""
      ? options[0]
      : reverseMap[startAndEnd[0]];
  });
  const [destination, setDestination] = useState(() => {
    return reverseMap[startAndEnd[1]] === ""
      ? options[0]
      : reverseMap[startAndEnd[1]];
  });

  return (
    <MapSideBarContainer>
      <Bar>
        <CgLoadbar size={40} />{" "}
        <p style={{ fontSize: "10px" }}>
          Swipe up to lock drawer <br /> Swipe down to look at map
        </p>
      </Bar>
      <InputSection
        sidebar={sidebar}
        setTransferredBuses={setTransferredBuses}
        setBusArrivalTime={setBusArrivalTime}
        time={timeInput}
        date={dateInput}
        month={month}
        year={year}
        day={day}
        setSelectedRoute={setSelectedRoute}
        current={current}
        destination={destination}
        setCurrent={setCurrent}
        setDestination={setDestination}
      />
      <Dividers />

      <MobileCustomization
        sidebar={sidebar}
        setTime={setTimeInput}
        setDate={setDateInput}
        setMonth={setMonth}
        setYear={setYear}
        setDay={setDay}
        setIncludeArrivalTime={setIncludeArrivalTime}
        setSelectedRoute={setSelectedRoute}
        current={current}
        destination={destination}
        departureSetting={departureSetting}
        setDepartureSetting={setDepartureSetting}
        alarmToggle={alarmToggle}
        setAlarmToggle={setAlarmToggle}
        setBusArrivalTime={setBusArrivalTime}
      />

      <Routes
        includeArrivalTime={includeArrivalTime}
        transferredBuses={transferredBuses}
        setTransferredBuses={setTransferredBuses}
        busArrivalTime={busArrivalTime}
        setBusArrivalTime={setBusArrivalTime}
        routeRecommendations={routeRecommendations}
        setRoute={setRoute}
        route={route}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        renderRouteIndex={renderRouteIndex}
        setRenderRouteIndex={setRenderRouteIndex}
      />

      <Logo to="/">
        {" "}
        <IoHomeSharp
          size={25}
          style={{ position: "relative", top: "5px", right: "5px" }}
        />{" "}
        Home{" "}
      </Logo>
    </MapSideBarContainer>
  );
};

export default MapSideBar;
