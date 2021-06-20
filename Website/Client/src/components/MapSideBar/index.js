import Customization from "./Customization/";
import InputSection from "./InputSection/";
import Routes from "./Routes/";
import { useState } from "react";
import Divider from "@material-ui/core/Divider";
import { NavLogo } from "../Navbar/NavbarElements";
import { useHistory } from "react-router-dom";


const MapSideBar = ({ routeRecommendations, setRoute, route, startAndEnd }) => {
  const [arrivalTime, setArrivalTime] = useState(() => false);
  const [distance, setDistance] = useState(() => false);
  const [differentService, setDifferentService] = useState(() => false);
  const [bfs, setBfs] = useState(() => false);
  const obj = new Date();
  let [hour, minute] = obj.toLocaleTimeString("it-IT").split(/:| /);
  let [monthNow, dateNow, yearNow] = obj.toLocaleDateString("en-US").split("/");
  const today = obj.getDay();
  const [time, setTime] = useState(() => hour + minute);
  const [date, setDate] = useState(() => parseInt(dateNow));
  const [month, setMonth] = useState(() => parseInt(monthNow));
  const [year, setYear] = useState(() => parseInt(yearNow));
  const [isOpen, setIsOpen] = useState(() => false);
  const [day, setDay] = useState(() => today);
  const [selectedRoute, setSelectedRoute] = useState(() => null);

  const history = useHistory();
  const toggleHome = () => {
    history.push("/");
  };

  return (
    <div style={{ background: "black" }}>
      <InputSection
        startAndEnd={startAndEnd}
        time={time}
        date={date}
        month={month}
        year={year}
        day={day}
        setSelectedRoute={setSelectedRoute}
      />
      <Divider style={{ background: "white", marginTop: '20px'}} variant="middle" />
      <Customization
        setTime={setTime}
        setArrivalTime={setArrivalTime}
        setDistance={setDistance}
        setDifferentService={setDifferentService}
        setBfs={setBfs}
        setDate={setDate}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMonth={setMonth}
        setYear={setYear}
        setDay={setDay}
      />
      <Divider style={{ background: "white", marginTop: '20px'}} variant="middle" />
      <Routes
        routeRecommendations={routeRecommendations}
        setRoute={setRoute}
        isOpen={isOpen}
        arrivalTime={arrivalTime}
        distance={distance}
        differentService={differentService}
        bfs={bfs}
        route={route}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      
      <NavLogo
        to="/"
        onClick={toggleHome}
        style={{
          position: "absolute",
          bottom: "3vh",
          left: '11.5vw'
        }}
      >
        NUSROUTES
      </NavLogo>
    </div>
  );
};

export default MapSideBar;
