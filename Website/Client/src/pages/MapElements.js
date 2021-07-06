import styled from "styled-components";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export const PageContainer = styled.div`
  background: black;
  display: flex;
`;

export const SideBarContainer = styled.div`
  width: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
  height: 100vh;
  z-index: 1;
  transition: all 0.15s ease-in-out;
  position: relative;

  @media screen and (max-width: 1500px) {
    width: ${({ $sidebar }) => ($sidebar ? "37.3vw" : "0vw")};
  }

  @media screen and (max-width: 1100px) {
    width: ${({ $sidebar }) => ($sidebar ? "46vw" : "0vw")};
  }

  @media screen and (max-width: 828px) {
    width: ${({ $sidebar }) => ($sidebar ? "0vw" : "100vw")};
    height: ${({ $sidebar }) => ($sidebar ? "0vh" : "100vh")};
  }

  @media screen and (max-height: 750px) {
    width: ${({ $sidebar }) => ($sidebar ? "0vw" : "100vw")};
    height: ${({ $sidebar }) => ($sidebar ? "0vh" : "100vh")};
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;

  @media screen and (max-width: 828px) {
    width: ${({ $sidebar }) => ($sidebar ? "100vw" : "0vw")};
    height: ${({ $sidebar }) => ($sidebar ? "100vh" : "0vw")};
  }

  @media screen and (max-height: 750px) {
    width: ${({ $sidebar }) => ($sidebar ? "100vw" : "0vw")};
    height: ${({ $sidebar }) => ($sidebar ? "100vh" : "0vh")};
  }
`;

export const ArrowLeftButton = styled(ArrowLeftRoundedIcon)`
  && {
    position: absolute;
    z-index: 2;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
    cursor: pointer;
    background: #FFB6C1;
    width: 1vw;
    height: 4vh;
    transition: background 2s;

    @media screen and (max-width: 1500px) {
      width: 2vw;
      left: ${({ $sidebar }) => ($sidebar ? "37.5%" : "0vw")};
    }

    @media screen and (max-width: 1100px) {
      left: ${({ $sidebar }) => ($sidebar ? "46%" : "0vw")};
      width: 3vw;
    }

    @media screen and (max-width: 828px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "0vw" : "97%")};
    }

    @media screen and (max-height: 750px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "0vw" : "97%")};
    }

    @media screen and (max-width: 492px) {
      width: 6vw;
      left: ${({ $sidebar }) => ($sidebar ? "0vw": "94%")};
    }

    &:hover {
      height: 6vh;
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
    left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
    cursor: pointer;
    background: #FFB6C1;
    width: 1vw;
    height: 4vh;
    transition: background 2s;

    @media screen and (max-width: 1500px) {
      left: ${({ $sidebar }) => ($sidebar ? "33.2vw" : "0vw")};
    }

    @media screen and (max-width: 1100px) {
      left: ${({ $sidebar }) => ($sidebar ? "41.2vw" : "0vw")};
      width: 3vw;
    }

    @media screen and (max-width: 828px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "0%" : "97%")};
    }

    @media screen and (max-height: 750px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "0vw" : "97%")};
    }

    @media screen and (max-width: 492px) {
      width: 6vw;
      left: ${({ $sidebar }) => ($sidebar ? "0vw" : "94%")};
    }

    &:hover {
      height: 6vh;
    }
  }
`;
