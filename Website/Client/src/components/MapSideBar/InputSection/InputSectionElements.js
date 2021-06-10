import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const Form = styled.div`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  padding-left: 2vw;
`;

export const FormLabel = styled.h5`
  color: #fff;
  text-align: Center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`;