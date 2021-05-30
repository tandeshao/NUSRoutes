import Video from "../../video/video.mp4";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "../Box";
import styles from "./Selection.module.css";

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

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  const options = [
    "",
    "AS5",
    "BIZ 2",
    "Botanic Gardens MRT",
    "BTC - Oei Tiong Ham Building",
    "Central Library",
    "College Green",
    "COM2",
    "EA",
    "Information Technology",
    "Kent Ridge MRT",
    "Kent Vale",
    "LT13",
    "LT27",
    "Museum",
    "Opp HSSML",
    "Opp Kent Ridge MRT",
    "Opp NUSS",
    "Opp TCOMS",
    "Opp University Hall",
    "Opp University Health Centre",
    "Opp YIH",
    "Prince George's Park",
    "Prince George's Park Residence",
    "Raffles Hall (Opp. Museum)",
    "S17",
    "TCOMS",
    "University Hall",
    "University Health Centre",
    "University Town",
    "Ventus (Opp LT13)",
    "YIH",
    "The Japanese Primary School",
    "Kent Ridge Bus Terminal",
  ];

  const map = {
    AS5: "AS7",
    "BIZ 2": "BIZ2",
    "Botanic Gardens MRT": "BG-MRT",
    "BTC - Oei Tiong Ham Building": "BUKITTIMAH",
    "Central Library": "CENLIB",
    "College Green": "CGH",
    COM2: "COM2",
    EA: "BLK-EA-OPP",
    "Information Technology": "COMCEN",
    "Kent Ridge MRT": "KR-MRT",
    "Kent Vale": "KV",
    LT13: "LT13",
    LT27: "LT27",
    Museum: "MUSEUM",
    "Opp HSSML": "HSSML-OPP",
    "Opp Kent Ridge MRT": "HSSML-OPP",
    "Opp NUSS": "NUSS-OPP",
    "Opp TCOMS": "PGP12-OPP",
    "Opp University Hall": "UHALL-OPP",
    "Opp University Health Centre": "STAFFCLUB-OPP",
    "Opp YIH": "YIH-OPP",
    "Prince George's Park": "PGPT",
    "Prince George's Park Residence": "PGPR",
    "Raffles Hall (Opp. Museum)": "RAFFLES",
    S17: "S17",
    TCOMS: "PGP12",
    "University Hall": "UHALL",
    "University Health Centre": "STAFFCLUB",
    "University Town": "UTown",
    "Ventus (Opp LT13)": "LT13-OPP",
    YIH: "YIH",
    "The Japanese Primary School": "JP-SCH-16151",
    "Kent Ridge Bus Terminal": "KR-BT",
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
      const curId = map[current];
      const destId = map[destination];
      const routing = { curId, destId };

      // do something, print for now
      console.log(routing);

      // redirect
      history.push("/");
    }
  };

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1> Navigation Around Campus Made Easy</HeroH1>

        <Form>
          <form onSubmit={handleSubmit}>
            <Box>
              <FormLabel>Current location: </FormLabel>
              <Autocomplete
                value={current}
                onChange={(event, newValue) => {
                  setCurrent(newValue);
                }}
                id="Current"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    className={styles.selection}
                    {...params}
                    label="Current"
                    variant="outlined"
                    error={currentError}
                  />
                )}
              />
              <br />
              <FormLabel>Destination: </FormLabel>
              <Autocomplete
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
                    label="Destination"
                    variant="outlined"
                    error={destinationError}
                  />
                )}
              />
            </Box>

            <HeroBtnWrapper>
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
