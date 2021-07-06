import styled from "styled-components";

export const SectionContainer = styled.div`
  width: 100vw;
  min-height: 10%;
  height: auto;
  position: relative;
`;

export const DepartureContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 12%;
  left: 1%;
  width: auto;

  @media screen and (max-width: 450px) {
    left: 3%;
  }
`;

export const OptionsContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 12%;
  left: 10%;
  width: auto;

  @media screen and (max-width: 1500px) {
    left: 15%;
  }

  @media screen and (max-width: 1100px) {
    left: 20%;
  }

  @media screen and (max-height: 750px) {
    display: none;
  }

  @media screen and (max-width: 828px) {
    left: 45%;
  }

`;

export const OptionsContainer2 = styled.div`
  display: none;

  @media screen and (max-height: 750px) {
    display: block;
    color: #fff;
    position: absolute;
    top: 12%;
    left: 45%;
    width: auto;
  }
`
export const ProximityAlarmContainer = styled.div`
  position: absolute;
  margin-top: 25px;
  margin-left: 15px;
  top: 30%;
  left: 1%;
`
;
