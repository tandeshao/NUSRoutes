import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { Link as LinkR } from "react-router-dom";

export const MapSideBarContainer = styled.div`
  background: black;
  backdrop-filter: opacity(80%);
  display: flex;
  flex-direction: column;
  padding-bottom: 1%;
`;

export const Dividers = styled(Divider)`
  && {
    background: white;
    margin-top: 3%;
  }
`;

export const Logo = styled(LinkR)`
  position: absolute;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
  color: #ff2400;
  bottom: 20%;
  right: 2vw;

  @media screen and (max-height: 1130px) {
    bottom: -15%;
  }

  @media screen and (max-height: 1000px) {
    bottom: -10%;
  }

  @media screen and (max-height: 874px) {
    bottom: -4%;
  }

  @media screen and (max-height: 800px) {
    bottom: 0%;
  }

  @media screen and (max-height: 731px) {
    bottom: 5%;
  }

  @media screen and (max-height: 673px) {
    bottom: 10%;
  }
`;
