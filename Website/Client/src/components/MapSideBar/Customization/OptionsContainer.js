import styled from "styled-components";

export const SectionContainer = styled.div`
  width: 100%;
  min-height: 10%;
  height: 10vh;
  position: relative;
  margin-bottom: 20px;

  @media screen and (max-width: 400px) (max-height: 820px) {
    margin-bottom: 20px;
  }

`;

export const DepartureContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 12%;
  left: 1%;
  width: auto;

  @media screen and (max-width: 400px) (max-height: 820px) {
    display: none;
  }

`;

export const OptionsContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 12%;
  width: auto;
  right: 10%;

  @media screen and (max-width: 400px) and (max-height: 820px) {
    display: none;
  }

`;

export const ProximityAlarmContainer = styled.div`
  position: absolute;
  margin-left: 15px;
  top: 60%;
  left: 1%;

  @media screen and (max-width: 400px) and (max-height: 820px) {
    display: none;
  }

`;
