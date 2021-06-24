import styled from "styled-components";

export const NUSRoutes = styled.h1`
  color: #ff2400;
  margin-top: 20px;
`;

export const GoogleButton = styled.button`
  border-radius: 50px;
  background: #fff;
  white-space: nowrap;
  padding: 10px 15px;
  color: #010606;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 15px 10px;

  @media screen and (max-width: 400px) {
    transition: 0.8s all ease;
    font-size: 18px;
  }

  @media screen and (max-width: 310px) {
    transition: 0.8s all ease;
    font-size: 15px;
  }
`;
