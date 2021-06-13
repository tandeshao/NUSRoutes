import styled from "styled-components";

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
  margin: 10px 10px;

  @media screen and (max-width: 450px) {
    transition: 0.8s all ease;
    font-size: 16px;
  }

  @media screen and (max-width: 400px) {
    transition: 0.8s all ease;
    font-size: 14px;
  }

  @media screen and (max-width: 380px) {
    transition: 0.8s all ease;
    font-size: 12px;
  }
`;
