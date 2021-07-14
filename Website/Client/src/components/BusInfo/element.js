import styled from "styled-components";

export const Header = styled.h1`
  position: absolute;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 64px;
  top: 5vh;
  text-align: center;
  margin-top: 60px;
  
  @media screen and (max-width: 700px) {
    font-size: 1.7rem;
    margin-top: 0px;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 450px) and (max-height: 900px) {
    font-size: 2rem;
    top: 20vh;
  }

  
`;
