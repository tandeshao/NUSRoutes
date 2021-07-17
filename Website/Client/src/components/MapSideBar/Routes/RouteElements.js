import styled from "styled-components";

export const RouteContainer = styled.div`
  padding: 20px;
  cursor: pointer;
  color: #fff;
  background: #181818;
  filter: brightness(1);
  width: 80%;
  border-radius: 40px;
  border: 7px solid black;
  position: relative;

  &:active {
    background: #404040;
  }

  @media screen and (max-width: 450px) and (max-height: 900px) {
    background: #121212;
    border: 2px solid #282828;
    font-size: 11px;
    width: 90%;
    padding: 5px 0 5px 50px;
    margin-bottom: 15px;
  }
`;

export const ScrollBar = styled.div`
  overflow-y: auto;
  height: 45vh;
  background: black;
  maxwidth: 20vw;
  margin: 20px;
  opacity: 90%;
  backdrop-filter: brightness(0.2);

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-button {
    background-color: #666;
  }
  ::-webkit-scrollbar-track {
    background-color: #646464;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #000;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-corner {
    background-color: #646464;
  }
  ::-webkit-resizer {
    background-color: #666;
  }
  ::webkit-keyframes {
    100% {
      left: 0;
    }
  }
  ::keyframes {
    100% {
      left: 0;
    }
  }

  @media screen and (max-width: 450px) and (max-height: 900px) {
    background: #121212;
    padding: 0 0 0 5px;
    margin: 10px;
  }
`;

export const Effect = styled.div`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 0.5s linear;
  }

  .fade-appear {
    opacity: 0;
  }

  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 0.5s linear;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 0.5s linear;
  }

  .fade-exit-done {
    opacity: 0;
  }
`;

export const Container = styled.div`
  padding: 20px;
  color: #fff;
  background: #181818;
  backdrop-filter: brightness(0.5);
  border: 7px solid black;
  width: 95%;
  border-radius: 40px;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    background: #121212;
    border: 2px solid #282828;
    font-size: 11px;
    width: 80%;
    padding: 5px 0 5px 30px;
    margin-bottom: 15px;
    margin-left: 15px;
  }
`;

export const Container2 = styled.div`
  display: list-item;
  list-style-type: disc;
  list-style-position: inside;
  text-indent: -1.5em;
  padding: 20px;
  padding-left: 40px;
  color: #fff;
  background: #181818;
  backdrop-filter: brightness(0.5);
  border: 7px solid black;
  width: 95%;
  border-radius: 40px;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    background: #121212;
    border: 2px solid #282828;
    font-size: 13px;
    width: 80%;
    padding: 5px 0 5px 30px;
    margin-bottom: 15px;
    margin-left: 15px;
    height: auto;
  }
`;

export const ScrollBar2 = styled.div`
  overflow-y: auto;
  height: 45vh;
  background: black;
  maxwidth: 20vw;
  margin: 20px;
  opacity: 90%;

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-button {
    background-color: #666;
  }
  ::-webkit-scrollbar-track {
    background-color: #646464;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #000;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-corner {
    background-color: #646464;
  }
  ::-webkit-resizer {
    background-color: #666;
  }
  ::webkit-keyframes {
    100% {
      left: 0;
    }
  }
  ::keyframes {
    100% {
      left: 0;
    }
  }

  @media screen and (max-width: 450px) and (max-height: 900px) {
    background: #121212;
    padding: 0 0 0 5px;
    margin: 10px;
  }
`;

export const Arrow = styled.div`
  color: white;
  position: absolute;
  top: 10%;
  right: 0;
  height: 100%;
  width: 20%;
`;

export const Notifier = styled.h4`
  color: red;
  position: absolute;
  right: 10%;
  bottom: 5px;

  @media screen and (max-width: 450px) and (max-height: 900px) {
    right: 20%;
    top: 5px;
  }
`;
