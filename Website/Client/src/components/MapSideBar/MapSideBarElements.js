import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { Link as LinkR } from "react-router-dom";

export const MapSideBarContainer = styled.div`
  position: relative;
  background: black;
  height: 100%;
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
  bottom: 2%;
  right: 10%;
`;
