import styled from "styled-components";

export const Button = styled.button`
  border-radius: 30%;
  background: aquamarine;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "5px 20px" : "10px 10px")};
  color: ${({ dark }) => (dark ? "#000" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  height: 6%;
  width: 3%;
  position: absolute;
  left: 18%;
  top: 19.9%;
  

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#01BF71")};
  }
`;
