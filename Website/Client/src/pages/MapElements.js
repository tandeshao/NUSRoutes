import styled from "styled-components";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export const PageContainer = styled.div`
  ${
    "" /* display: flex;
  flex-direction: row-reverse; */
  }
  @media screen and (max-width: 450px) and (max-height: 900px) {
    display: flex;
    flex-direction: row-reverse;
    height: 100vh;
  }
`;

export const SideBarContainer = styled.div`
  width: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
  height: 100vh;
  z-index: 1;
  transition: all 0.15s ease-in-out;
  position: relative;

  @media screen and (max-width: 1700px) {
    width: ${({ $sidebar }) => ($sidebar ? "33vw" : "0vw")};
  }

  @media screen and (max-width: 1100px) {
    width: ${({ $sidebar }) => ($sidebar ? "40vw" : "0vw")};
  }
`;

export const MapContainer = styled.div`
  ${
    "" /* width: 100%;
  min-height: 0;
  max-height: 100vh; */
  }
  height: 100vh;
  width: ${({ $sidebar }) => ($sidebar ? "75vw" : "100vw")};
  z-index: 2;
  position: absolute;
  right: 0;

  @media screen and (max-width: 1700px) {
    width: ${({ $sidebar }) => ($sidebar ? "67vw" : "100vw")};
  }

  @media screen and (max-width: 1100px) {
    width: ${({ $sidebar }) => ($sidebar ? "60vw" : "100vw")};
  }

  @media screen and (max-width: 450px) and (max-height: 900px) {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 1;
  }
`;

export const ArrowLeftButton = styled(ArrowLeftRoundedIcon)`
  && {
    position: relative;
    z-index: 3;
    font-size: 100px;
    top: 50vh;
    color: black;
    ${"" /* left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")}; */}
    cursor: pointer;
    background: #b3b3b3;
    width: 1.3vw;
    height: 6vh;
    transition: background 2s;

    ${
      "" /* @media screen and (max-width: 1700px) {
      width: 2vw;
      left: ${({ $sidebar }) => ($sidebar ? "37.5%" : "0vw")};
    }

    @media screen and (max-width: 1500px) {
      width: 2vw;
      left: ${({ $sidebar }) => ($sidebar ? "37.5%" : "0vw")};
    }

    @media screen and (max-width: 1100px) {
      left: ${({ $sidebar }) => ($sidebar ? "46%" : "0vw")};
      width: 3vw;
    }

    @media screen and (max-width: 1100px) and (max-height: 735px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "74vw" : "0vw")};
    }

    @media screen and (max-width: 733px) and (max-height: 735px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "78vw" : "0vw")};
    }

    @media screen and (max-width: 557px) and (max-height: 735px) {
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "84vw" : "0vw")};
    } */
    }

    &:hover {
      height: 8vh;
    }

    @media screen and (max-width: 450px) and (max-height: 900px) {
      display: none;
    }
  }
`;

export const ArrowRightButton = styled(ArrowRightRoundedIcon)`
  && {
    position: relative;
    z-index: 3;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
    cursor: pointer;
    background: #b3b3b3;
    width: 1.3vw;
    height: 6vh;
    transition: background 2s;

    &:hover {
      height: 8vh;
    }

    @media screen and (max-width: 450px) and (max-height: 900px) {
      display: none;
    }
  }
`;

export const MobileView = styled.div`
  display: none;
  @media screen and (max-width: 450px) and (max-height: 900px) {
    display: block;
  }
`;

export const DesktopView = styled.div`
  @media screen and (max-width: 450px) and (max-height: 900px) {
    display: none;
  }
`;
