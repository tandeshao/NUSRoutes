import { Button } from "../ButtonElement";
import { useState } from "react";
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./InfoElements";

const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headLine,
  darkText,
  description,
  buttonLabel,
  img,
  alt,
  primary,
  dark,
  dark2,
}) => {
  const [isOpen, setIsOpen] = useState(() => false);

  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine> {topLine} </TopLine>
                <Heading lightText={lightText}> {headLine} </Heading>
                <Subtitle darkText={darkText}> {description} </Subtitle>
                <BtnWrap>
                  <Button
                    to="home"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                    primary={primary ? 1 : 0} //from stackoverflow
                    dark={dark ? 1 : 0} //from stackoverflow
                    dark2={dark2 ? 1 : 0}
                  >
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} onClick={() => setIsOpen(true)} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
        {isOpen ? (
          <>
            <div
              style={{
                zIndex: "99",
                position: "fixed",
                background: "#353535",
                width: "100vw",
                height: "100vh",
                top: "0",
                right: "0",
                backdropFilter: "blur(5px) brightness(0.5)",
                opacity: "80%",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            />
            <img
              src={img}
              alt={""}
              style={{
                position: "fixed",
                left: "50%",
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '100',
                width: "75%",
                height: "auto",
                minWidth: '100px',
                cursor: 'pointer'
              }}
              onClick={() => setIsOpen(false)}
            />
          </>
        ) : (
          ""
        )}
      </InfoContainer>
    </>
  );
};

export default InfoSection;
