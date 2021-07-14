import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { Link as LinkR } from "react-router-dom";

export const MapSideBarContainer = styled.div`
  position: relative;
  background: black;
  height: 100%;
  backdrop-filter: opacity(80%);
  display: flex;
  padding-bottom: 1%;
  flex-direction: column;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    width: 100vw;
    background: #121212;
    margin-top: 5vh;
    height: 92vh;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 1;
  }
`;

export const Dividers = styled(Divider)`
  && {
    background: #282828;
    margin-top: 3%;
    height: 3px;
  }
`;

export const Logo = styled(LinkR)`
  position: absolute;
  font-size: 1rem;
  text-decoration: none;
  font-weight: bold;
  color: white;
  bottom: 2%;
  right: 10%;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    display: none;
  }
`;

export const Bar = styled.div`
  display: none;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    display: block;
    color: #404040;
    text-align: center;
  }
`
