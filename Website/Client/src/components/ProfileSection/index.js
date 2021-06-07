import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import {
  HeroContainer,
  HeroBg,
  HeroContent,
  HeroH1,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  Form,
  FormLabel,
} from "./ProfileElements";
import { Button } from "../ButtonElement";

const ProfileSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      <HeroBg />
    </HeroContainer>
  );
};

export default ProfileSection;

/*

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

      */
