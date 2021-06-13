import firebase from "firebase/app";
import "firebase/firestore";

import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import {
  HeroContainer,
  HeroBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  Form,
  FormLabel,
} from "./ProfileElements";
import { Button } from "../ButtonElement";

const HistorySection = () => {
  const [data, setData] = useState(() => []);

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    const db = firebase.firestore();
    var userRef = db.collection("user").doc(id);
    userRef.get().then((doc) => {
      const hist = doc.data().hist;
      setData(hist);
    });
  }, []);

  console.log(data);

  return (
    <HeroContainer id="home">
      <HeroBg />
      <HeroContent>
        <HeroH1>History</HeroH1>
        {data.map((x, index) => {
          return <HeroP key={index}> {x.current} </HeroP>;
        })}
      </HeroContent>
    </HeroContainer>
  );
};

export default HistorySection;
