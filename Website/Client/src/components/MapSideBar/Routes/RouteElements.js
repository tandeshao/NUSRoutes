import styled from "styled-components";

export const RouteContainer = styled.div`
  padding: 20px;
  cursor: pointer;
  color: #fff;
  background: #353535;
  filter: brightness(0.5);
  border: 7px solid black;
  width: 18vw;
  
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;

export const ScrollBar = styled.div`
 overflow-y: auto;
 height: ${({ isOpen }) => (isOpen ? "30vh" : "45vh")};
 background: black  ;
 maxWidth: 20vw;
 margin: 20px;
 opacity: 90%;
 backdrop-filter: blur(5px) brightness(0.2);

 ::-webkit-scrollbar { width: 8px; height: 3px;}
 ::-webkit-scrollbar-button {  background-color: #666; }
 ::-webkit-scrollbar-track {  background-color: #646464;}
 ::-webkit-scrollbar-track-piece { background-color: #000;}
 ::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
 ::-webkit-scrollbar-corner { background-color: #646464;}
 ::-webkit-resizer { background-color: #666;}
 ::webkit-keyframes  { 100% { left: 0; }}
 ::keyframes { 100% { left: 0; }}
`;

export const Effect = styled.div`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 1s linear;
  }

  .fade-appear {
    opacity: 0;
  }

  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 1s linear;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 1s linear;
  }

  .fade-exit-done {
    opacity: 0;
  }
`;

export const Container = styled.div`
  padding: 20px;
  cursor: pointer;
  color: #fff;
  background: #353535;
  filter: brightness(0.5);
  border: 7px solid black;
  width: 18vw;

`;

export const ScrollBar2 = styled.div`
 overflow-y: auto;
 height: ${({ isOpen }) => (isOpen ? "30vh" : "45vh")};
 background: black  ;
 maxWidth: 20vw;
 margin: 20px;
 opacity: 90%;
 

 ::-webkit-scrollbar { width: 8px; height: 3px;}
 ::-webkit-scrollbar-button {  background-color: #666; }
 ::-webkit-scrollbar-track {  background-color: #646464;}
 ::-webkit-scrollbar-track-piece { background-color: #000;}
 ::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
 ::-webkit-scrollbar-corner { background-color: #646464;}
 ::-webkit-resizer { background-color: #666;}
 ::webkit-keyframes  { 100% { left: 0; }}
 ::keyframes { 100% { left: 0; }}
`;