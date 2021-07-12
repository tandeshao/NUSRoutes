import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

export const MapNavbarContainer = styled.div`
  && {
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 1400;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.98);
    height: 8vh;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
`;

export const LinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
  text-decoration: none;
`;
