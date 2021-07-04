import styled from "styled-components";

export const SectionContainer = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
`;

export const DepartureContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 10%;
  left: 3%;
  width: 100%;

  @media screen and (max-width: 450px) {
    left: 3%;
  }
`;

export const OptionsContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 10%;
  left: 41%;
  width: 100%;

  @media screen and (max-height: 850px) {
    display: none;
  }
`;

export const OptionsContainer2 = styled.div`
  display: none;

  @media screen and (max-height: 850px) {
    display: block;
    color: #fff;
    position: absolute;
    top: 10%;
    left: 45%;
    width: 100%;
  }
`
export const ProximityAlarmContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
`
;
