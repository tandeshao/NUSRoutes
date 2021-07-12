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

  @media screen and (max-width: 400px) and (max-height: 860px) {
    width: 100vw;
    min-height: 35vh;
    height: 90vh;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 1;
  }
`;

export const Dividers = styled(Divider)`
  && {
    background: #2d2d39;
    margin-top: 3%;
    height: 10px;
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

  @media screen and (max-width: 400px) and (max-height: 860px) {
    display: none;
  }
`;
