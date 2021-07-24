import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

export const MapNavbarContainer = styled.div`
  && {
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 1400;
    width: 100vw;
    background: #282828;
    height: 8vh;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b3b3b3;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
  text-decoration: none;
  justify-content: center;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    font-size: 10px;
  }

  &:active {
    background: #404040;
  }
`;

export const LinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b3b3b3;
  padding: 10px;
  flex-grow: 1;
  text-align: center;
  text-decoration: none;
  justify-content: center;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    font-size: 10px;
  }

  &:active {
    background: #404040;
  }
`;
