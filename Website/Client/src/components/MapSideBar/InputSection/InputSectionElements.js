import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const InputSectionContainer = styled.div`
  min-height: 28vh;
  position: relative;
`;

export const Switch = styled.img`
  position: absolute;
  height: 25%;
  right: 10%;
  top: 40%;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    height: 20%;
    right: 20%;
    top: 40%;
  }

  @media screen and (max-width: 624px) {
    height: 15%;
  }
`;

export const Form = styled.div`
  height: 100%;
  width: 70%;
  color: #fff;
  font-size: 1em;
  text-align: center;
  margin: 0 3%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  
  
`;

export const FormLabel = styled.h5`
  color: #fff;
  padding: 1rem;
  width: 100%;
  right: 20%;

  
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 100%;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 100%;
`;

export const Button = styled.button`
  border-radius: 50px;
  background: ${({ primary, secondary }) =>
    primary ? "#76e8dd" : secondary ? "#08a3a3" : "#010606"};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#000" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  width: 100%;
  margin-top: 7%;
  margin-bottom: 7%;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }
`;
