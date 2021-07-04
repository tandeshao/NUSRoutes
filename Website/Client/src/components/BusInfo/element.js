import styled from "styled-components";

export const Header = styled.h1`
  position: absolute;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 64px;
  top: 5vh;
  
  @media screen and (max-width: 700px) {
    font-size: 1.7rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.1rem;
  }
`;
