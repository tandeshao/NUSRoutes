import { HeroContainer, HeroBg, HeroContent, HeroH1 } from "./ProfileElements";

const FavouritesSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg />
      <HeroContent>
        <HeroH1>Favourites</HeroH1>
      </HeroContent>
    </HeroContainer>
  );
};

export default FavouritesSection;

/*
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

const FavouritesSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg />
      <HeroContent>
        <HeroH1>Favourites</HeroH1>
      </HeroContent>
    </HeroContainer>
  );
};

export default FavouritesSection;
*/
