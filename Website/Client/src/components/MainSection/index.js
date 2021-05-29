import Video from "../../video/video.mp4";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
  FormSelect,
} from "./MainElements";
import { Button } from "../ButtonElement";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  const [current, setCurrent] = useState("AS7");
  const [destination, setDestination] = useState("AS7");
  const history = useHistory();

  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();
    const routing = { current, destination };

    // do something, print for now
    console.log(routing);

    // redirect
    history.push("/");
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
            <FormLabel>Current location: </FormLabel>
            <FormSelect
              name="Current"
              id="Current"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            >
              <option value="AS7">AS5</option>
              <option value="BIZ2">BIZ 2</option>
              <option value="BG-MRT">Botanic Gardens MRT</option>
              <option value="BUKITTIMAH">BTC - Oei Tiong Ham Building</option>
              <option value="CENLIB">Central Library</option>
              <option value="CGH">College Green</option>
              <option value="COM2">COM2</option>
              <option value="BLK-EA-OPP">EA</option>
              <option value="COMCEN">Information Technology</option>
              <option value="KR-MRT">Kent Ridge MRT</option>
              <option value="KV">Kent Vale</option>
              <option value="LT13">LT13</option>
              <option value="LT27">LT27</option>
              <option value="MUSEUM">Museum</option>
              <option value="HSSML-OPP">Opp HSSML</option>
              <option value="KR-MRT-OPP">Opp Kent Ridge MRT</option>
              <option value="NUSS-OPP">Opp NUSS</option>
              <option value="PGP12-OPP">Opp TCOMS</option>
              <option value="UHALL-OPP">Opp University Hall</option>
              <option value="STAFFCLUB-OPP">
                Opp University Health Centre
              </option>
              <option value="YIH-OPP">Opp YIH</option>
              <option value="PGPT">Prince George's Park</option>
              <option value="PGPR">Prince George's Park Residence</option>
              <option value="RAFFLES">Raffles Hall (Opp. Museum)</option>
              <option value="S17">S17</option>
              <option value="PGP12">TCOMS</option>
              <option value="UHALL">University Hall</option>
              <option value="STAFFCLUB">University Health Centre</option>
              <option value="UTown">University Town</option>
              <option value="LT13-OPP">Ventus (Opp LT13)</option>
              <option value="YIH">YIH</option>
              <option value="JP-SCH-16151">The Japanese Primary School</option>
              <option value="KR-BT">Kent Ridge Bus Terminal</option>
            </FormSelect>
            <FormLabel> Destination: </FormLabel>
            <FormSelect
              name="Destination"
              id="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="AS7">AS5</option>
              <option value="BIZ2">BIZ 2</option>
              <option value="BG-MRT">Botanic Gardens MRT</option>
              <option value="BUKITTIMAH">BTC - Oei Tiong Ham Building</option>
              <option value="CENLIB">Central Library</option>
              <option value="CGH">College Green</option>
              <option value="COM2">COM2</option>
              <option value="BLK-EA-OPP">EA</option>
              <option value="COMCEN">Information Technology</option>
              <option value="KR-MRT">Kent Ridge MRT</option>
              <option value="KV">Kent Vale</option>
              <option value="LT13">LT13</option>
              <option value="LT27">LT27</option>
              <option value="MUSEUM">Museum</option>
              <option value="HSSML-OPP">Opp HSSML</option>
              <option value="KR-MRT-OPP">Opp Kent Ridge MRT</option>
              <option value="NUSS-OPP">Opp NUSS</option>
              <option value="PGP12-OPP">Opp TCOMS</option>
              <option value="UHALL-OPP">Opp University Hall</option>
              <option value="STAFFCLUB-OPP">
                Opp University Health Centre
              </option>
              <option value="YIH-OPP">Opp YIH</option>
              <option value="PGPT">Prince George's Park</option>
              <option value="PGPR">Prince George's Park Residence</option>
              <option value="RAFFLES">Raffles Hall (Opp. Museum)</option>
              <option value="S17">S17</option>
              <option value="PGP12">TCOMS</option>
              <option value="UHALL">University Hall</option>
              <option value="STAFFCLUB">University Health Centre</option>
              <option value="UTown">University Town</option>
              <option value="LT13-OPP">Ventus (Opp LT13)</option>
              <option value="YIH">YIH</option>
              <option value="JP-SCH-16151">The Japanese Primary School</option>
              <option value="KR-BT">Kent Ridge Bus Terminal</option>
            </FormSelect>

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

/*
        <HeroP>
          {" "}
          Not sure how to travel around campus? <br />
          Try <strong>NUSROUTES!</strong> today!
        </HeroP>
        */
