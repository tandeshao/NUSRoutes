import Video from "../../video/video.mp4";
import { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./MainElements";
import {Button} from '../ButtonElement';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1> Navigation Around Campus Made Easy</HeroH1>
        <HeroP> Not sure how to travel around campus? 
        Look no further as we introduce to you <strong>NUSROUTES!</strong></HeroP>
        <HeroBtnWrapper>
          <Button to="services" onMouseEnter= {onHover} onMouseLeave={onHover}
          primary = "true"
          dark = "true"
          smooth={true}
          duration={500}
          spy={true}
          exact="true">
            Get Route {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
