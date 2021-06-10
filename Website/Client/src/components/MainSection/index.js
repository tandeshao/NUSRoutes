import Video from "../../video/video.mp4";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import data from "../../data/vacation.json";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  Form,
  FormLabel,
} from "./MainElements";
import { Button } from "../ButtonElement";
import options from "../../data/options.json";
import map from "../../data/map.json";
import styles from "./styles.json";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  const [current, setCurrent] = useState(options[0]);
  const [destination, setDestination] = useState(options[0]);
  const [currentError, setCurrentError] = useState(false);
  const [destinationError, setDestinationError] = useState(false);

  const history = useHistory();

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
      const start = map[current];
      const end = map[destination];
      let [hour, minute] = new Date().toLocaleTimeString("it-IT").split(/:| /);
      let time = hour + minute;
      const obj = new Date();
      let [month, date, year] = obj.toLocaleDateString("en-US").split("/");
      const day = obj.getDay();
      const category =
        data.reduce((x, y) => {
          if (x !== null) {
            return x;
          } else if (y["duration-year"].includes(parseInt(year))) {
            if (
              y["duration-month"][0] < parseInt(month) &&
              parseInt(month) < y["duration-month"][1]
            ) {
              return "vacation";
            } else if (
              y["duration-month"][0] === parseInt(month) ||
              parseInt(month) === y["duration-month"][1]
            ) {
              return y["duration-date"][0] <= parseInt(date) &&
                parseInt(date) <= y["duration-date"][1]
                ? "vacation"
                : "term";
            } else {
              return "term";
            }
          } else {
            return null;
          }
        }, null) +
        (parseInt(day) === 0
          ? "-sun/ph"
          : parseInt(day) === 6
          ? "-sat"
          : "-weekdays");

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
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1> Route Finder </HeroH1>

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
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination..."
                  variant="outlined"
                  error={destinationError}
                />
              )}
            />

            <HeroBtnWrapper>
              <Button
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                primary="true"
                dark="true"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
              >
                Get Route {hover ? <ArrowForward /> : <ArrowRight />}
              </Button>
            </HeroBtnWrapper>
          </form>
        </Form>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
