import styled from "styled-components";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;

  @media screen and (max-width: 400px) and (max-height: 820px) {
    ${'' /* flex-direction: column; */}
    display: block;
    height: 100vh;
    ${'' /* justify-content: flex-end; */}
  }
`;

export const SideBarContainer = styled.div`
  width: ${({ $sidebar }) => ($sidebar ? "33.2vw" : "0vw")};
  height: 100vh;
  z-index: 1;
  transition: all 0.15s ease-in-out;
  position: relative;

  @media screen and (max-width: 1700px) {
    width: ${({ $sidebar }) => ($sidebar ? "60vw" : "0vw")};
  }

  @media screen and (max-width: 1100px) {
    width: ${({ $sidebar }) => ($sidebar ? "85vw" : "0vw")};
  }

  @media screen and (max-width: 927px) and (max-height: 900px) {
    width: ${({ $sidebar }) => ($sidebar ? "100vww" : "0vw")};
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  min-height: 0;
  max-height: 100vh;
  z-index: 2;

  @media screen and (max-width: 400px) and (max-height: 820px) {
    position: fixed;
    height: 100vh;
    z-index: 1;
    
  }
`;

export const ArrowLeftButton = styled(ArrowLeftRoundedIcon)`
  && {
    position: absolute;
    z-index: 3;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
    cursor: pointer;
    background: #ffb6c1;
    width: 1vw;
    height: 4vh;
    transition: background 2s;

    @media screen and (max-width: 1700px) {
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

    @media screen and (max-width: 1100px) and (max-height: 735px){
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "74vw" : "0vw")};
    }

    @media screen and (max-width: 733px) and (max-height: 735px){
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "78vw" : "0vw")};
    }

    @media screen and (max-width: 557px) and (max-height: 735px){
      top: 35%;
      left: ${({ $sidebar }) => ($sidebar ? "84vw" : "0vw")};
    }

    &:hover {
      height: 6vh;
    }
  }
`;

export const ArrowRightButton = styled(ArrowRightRoundedIcon)`
  && {
    position: absolute;
    z-index: 3;
    font-size: 100px;
    top: 50vh;
    color: black;
    left: ${({ $sidebar }) => ($sidebar ? "25vw" : "0vw")};
    cursor: pointer;
    background: #ffb6c1;
    width: 1vw;
    height: 4vh;
    transition: background 2s;

    @media screen and (max-width: 1100px) and (max-height: 735px){
      top: 35%;
      width: 1rem;
    }


    &:hover {
      height: 6vh;
    }
  }
`;
