import options from "../../../data/options.json";
import map from "../../../data/map.json";
import styles from "../../MainSection/styles.json";
import data from "../../../data/vacation.json";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  Form,
  FormLabel,
  ArrowForward,
  ArrowRight,
} from "./InputSectionElements";
import { Button } from "../../ButtonElement";
import reverseMap from "../../../data/reverseMap.json";
import firebase from "firebase/app";
import "firebase/firestore";

const InputSection = ({ startAndEnd, time, day, date, month, year }) => {
  useEffect(() => {
    // to update time, day, date, month and year resource variables.
  }, [time, day, date, month, year]);
  const history = useHistory();

  const [hover, setHover] = useState(() => false);
  const onHover = () => {
    setHover(!hover);
  };
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
  const [currentError, setCurrentError] = useState(() => false);
  const [destinationError, setDestinationError] = useState(() => false);

  const user = window.localStorage.getItem("user");
  const id = window.localStorage.getItem("id");
  const db = firebase.firestore();

  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();
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
    <div
      style={{
        height: "35vh",
      }}
    >
      <Form>
        <form onSubmit={handleSubmit}>
          <FormLabel>Current location: </FormLabel>
          <Autocomplete
            classes={classes}
            value={current}
            onChange={(event, newValue) => {
              setCurrent(newValue);
            }}
            id="Current"
            options={options}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Current..."
                variant="outlined"
                error={currentError}
                color="secondary"
              />
            )}
          />
          <br />
          <FormLabel>Destination: </FormLabel>
          <Autocomplete
            classes={classes}
            value={destination}
            onChange={(event, newValue) => {
              setDestination(newValue);
            }}
            id="destination"
            options={options}
            style={{ width: '300px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destination..."
                variant="outlined"
                error={destinationError}
              />
            )}
          />

          <Button
            to="services"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            style={{ marginTop: "3vh" }}
          >
            Get Route {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InputSection;
