import options from "../../../data/options.json";
import map from "../../../data/map.json";
import styles from "./styles.json";
import data from "../../../data/vacation.json";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  Form,
  FormLabel,
  ArrowForward,
  ArrowRight,
  Switch,
  InputSectionContainer,
  Button,
  Button2,
  Switch2,
  MobileViewContainer,
  DesktopViewContainer,
} from "./InputSectionElements";

import firebase from "firebase/app";
import "firebase/firestore";
import image from "../../../images/switch.png";

const InputSection = ({
  time,
  day,
  date,
  month,
  year,
  setSelectedRoute,
  setBusArrivalTime,
  setTransferredBuses,
  current,
  destination,
  setCurrent,
  setDestination,
}) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  const [currentError, setCurrentError] = useState(() => false);
  const [destinationError, setDestinationError] = useState(() => false);

  const history = useHistory();
  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();
    const user = window.localStorage.getItem("user");
    const id = window.localStorage.getItem("id");
    const db = firebase.firestore();
    setCurrentError(false);
    setDestinationError(false);

    if (current === "") {
      setCurrentError(true);
    } else if (destination === "") {
      setDestinationError(true);
    } else {
      const obj = new Date();
      // Save to firestore
      if (user) {
        var userRef = db.collection("user").doc(id);
        userRef.get().then((doc) => {
          var data = doc.data();
          const newHist = data.hist;
          const now = obj.toString().substring(0, 24);
          newHist.push({
            current: current,
            destination: destination,
            time: now,
          });

          userRef.set(
            {
              hist: newHist,
            },
            {
              merge: true,
            }
          );
        });
      }

      const start = map[current];
      const end = map[destination];

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
      // might need to implement for PH
      history.push(
        "/map/routeRecommedation?start=" +
          encodeURIComponent(start) +
          "&end=" +
          encodeURIComponent(end) +
          "&time=" +
          encodeURIComponent(time) +
          "&date=" +
          encodeURIComponent(category)
      );
    }
  };

  const useStyles = makeStyles((theme) => styles);

  const classes = useStyles();

  return (
    <InputSectionContainer>
      <Switch
        onClick={() => {
          const curr = current;
          setCurrent(destination);
          setDestination(curr);
        }}
        src={image}
        alt=""
      />
      <Form>
        <form onSubmit={handleSubmit}>
          <FormLabel>Current location: </FormLabel>
          <DesktopViewContainer>
            <Autocomplete
              classes={classes}
              value={current}
              onChange={(event, newValue) => {
                setCurrent(newValue);
              }}
              id="Current"
              options={options}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="Choose Starting Point"
                  variant="outlined"
                  error={currentError}
                  color="secondary"
                />
              )}
            />
          </DesktopViewContainer>

          <MobileViewContainer>
            <Autocomplete
              classes={classes}
              value={current}
              onChange={(event, newValue) => {
                setCurrent(newValue);
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="Choose Starting Point"
                  style={{ width: "60vw" }}
                  variant="outlined"
                  error={currentError}
                  color="secondary"
                />
              )}
            />

            <Switch2
              onClick={() => {
                const curr = current;
                setCurrent(destination);
                setDestination(curr);
              }}
              src={image}
              alt=""
            />
          </MobileViewContainer>

          <br />
          <FormLabel>Destination: </FormLabel>
          <DesktopViewContainer>
            <Autocomplete
              classes={classes}
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Destination"
                  variant="outlined"
                  error={destinationError}
                />
              )}
            />
          </DesktopViewContainer>

          <MobileViewContainer>
            <Autocomplete
              classes={classes}
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              id="destination"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "60vw" }}
                  label="Choose Destination"
                  variant="outlined"
                  error={destinationError}
                />
              )}
            />

            <Button2
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              onClick={() => {
                setSelectedRoute(null);
                setBusArrivalTime([]);
                setTransferredBuses([]);
              }}
            >
              <strong>Go</strong>
            </Button2>
          </MobileViewContainer>

          <Button
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            onClick={() => {
              setSelectedRoute(null);
              setBusArrivalTime([]);
              setTransferredBuses([]);
            }}
          >
            <strong>Get Route</strong> {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </form>
      </Form>
    </InputSectionContainer>
  );
};

export default InputSection;
