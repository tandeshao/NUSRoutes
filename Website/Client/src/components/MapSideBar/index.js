import Customization from "./Customization/";
import InputSection from "./InputSection/";
import Routes from "./Routes/";
import { useState } from "react";
import { MapSideBarContainer, Dividers, Logo, Logo2 } from "./MapSideBarElements";
import reverseMap from "../../data/reverseMap.json";
import options from "../../data/options.json";
import { IoHomeSharp } from "react-icons/io5";


const MapSideBar = ({ routeRecommendations, setRoute, route, startAndEnd }) => {
  const [transferredBuses, setTransferredBuses] = useState(() => []);
  const [busArrivalTime, setBusArrivalTime] = useState(() => []);
  const obj = new Date();
  let [hour, minute] = obj.toLocaleTimeString("it-IT").split(/:| /);
  let [monthNow, dateNow, yearNow] = obj.toLocaleDateString("en-US").split("/");
  const today = obj.getDay();
  const [time, setTime] = useState(() => parseInt(hour + minute));
  const [date, setDate] = useState(() => parseInt(dateNow));
  const [month, setMonth] = useState(() => parseInt(monthNow));
  const [year, setYear] = useState(() => parseInt(yearNow));
  const [day, setDay] = useState(() => today);
  const [selectedRoute, setSelectedRoute] = useState(() => null);
  const [includeArrivalTime, setIncludeArrivalTime] = useState(() => true);
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
      <InputSection
        setTransferredBuses={setTransferredBuses}
        setBusArrivalTime={setBusArrivalTime}
        setTime={setTime}
        time={time}
        date={date}
        month={month}
        year={year}
        day={day}
        setSelectedRoute={setSelectedRoute}
        current={current}
        destination={destination}
        setCurrent={setCurrent}
        setDestination={setDestination}
      />
      <Dividers variant="middle" />
      <Customization
        setTime={setTime}
        setDate={setDate}
        setMonth={setMonth}
        setYear={setYear}
        setDay={setDay}
        setIncludeArrivalTime={setIncludeArrivalTime}
        setSelectedRoute={setSelectedRoute}
        current={current}
        destination={destination}
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
      />

      <Logo to="/">  <IoHomeSharp size={30} style={{position: 'relative', top:'5px', right: '5px'}}/> Home </Logo>
     
    </MapSideBarContainer>
  );
};

export default MapSideBar;
