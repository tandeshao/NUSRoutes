import styled from "styled-components";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export const PageContainer = styled.div`
  background: black;
  display: flex;
`;

export const SideBarContainer = styled.div`
  width: ${({ sideBar }) => (sideBar ? "30vw" : "0vw")};
  height: 100vh;
  z-index: 1;
  transition: all 0.15s ease-in-out;
  position: relative;

  @media screen and (max-width: 1500px) {
    width: ${({ sideBar }) => (sideBar ? "50vw" : "0vw")};
  }

  @media screen and (max-width: 1100px) {
    width: ${({ sideBar }) => (sideBar ? "70vw" : "0vw")};
  }

  @media screen and (max-width: 828px) {
    width: ${({ sideBar }) => (sideBar ? "100vw" : "0vw")};
    height: ${({ sideBar }) => (sideBar ? "100vh" : "0vh")};
  }
`;

export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;

  @media screen and (max-width: 828px) {
    width: ${({ sideBar }) => (sideBar ? "0vw" : "100vw")};
    height: ${({ sideBar }) => (sideBar ? "0vh" : "100vh")};
  }
`;

export const ArrowLeftButton = styled(ArrowLeftRoundedIcon)`
  && {
    position: absolute;
    z-index: 2;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ sideBar }) => (sideBar ? "23vw" : "0vw")};
    cursor: pointer;
    background: #dfccb7;
    width: 1vw;
    height: ${({ onHover }) => (onHover ? "6vh" : "4vh")};
    transition: background 2s;

    @media screen and (max-width: 1500px) {
      left: ${({ sideBar }) => (sideBar ? "33.2vw" : "0vw")};
    }

    @media screen and (max-width: 1100px) {
      left: ${({ sideBar }) => (sideBar ? "41.2vw" : "0vw")};
      width: 3vw;
    }

    @media screen and (max-width: 828px) {
      top: 35%;
      left: ${({ sideBar }) => (sideBar ? "97%" : "0vw")};
    }

    @media screen and (max-width: 492px) {
      width: 6vw;
      left: ${({ sideBar }) => (sideBar ? "94%" : "0vw")};
    }
  }
`;

export const ArrowRightButton = styled(ArrowRightRoundedIcon)`
  && {
    position: absolute;
    z-index: 2;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ sideBar }) => (sideBar ? "23vw" : "0vw")};
    cursor: pointer;
    background: #dfccb7;
    width: 1vw;
    height: ${({ onHover }) => (onHover ? "6vh" : "4vh")};
    transition: background 2s;

    @media screen and (max-width: 1500px) {
      left: ${({ sideBar }) => (sideBar ? "33.2vw" : "0vw")};
    }

    @media screen and (max-width: 1100px) {
      left: ${({ sideBar }) => (sideBar ? "41.2vw" : "0vw")};
      width: 3vw;
    }

    @media screen and (max-width: 828px) {
      top: 35%;
      left: ${({ sideBar }) => (sideBar ? "97%" : "0%")};
    }

    @media screen and (max-width: 492px) {
      width: 6vw;
      left: ${({ sideBar }) => (sideBar ? "94%" : "0vw")};
    }
  }
`;
