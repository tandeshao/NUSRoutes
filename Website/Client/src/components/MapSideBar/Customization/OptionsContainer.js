import styled from "styled-components";

export const SectionContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const Options = styled.form`
  color: #fff;
  font-size: 12px;
  position: absolute;
  margin: 3em;
`;

export const Item1 = styled.label`
  padding: 10px;
  color: #fff;
  margin: 5px;
`;
export const Item2 = styled.label`
  padding: 10px;
  color: #fff;
  margin: 5px;
`;
export const Item3 = styled.label`
  padding: 10px;
  color: #fff;
  margin: 5px;
`;
export const Item4 = styled.label`
  padding: 10px;
  color: #fff;
  margin: 5px;
`;

export const DepartureContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 10%;
  left: 7%;
  width: 100%;   
            

  @media screen and (max-width: 450px) {
    left: 7%;
  }
`;

export const OptionsContainer = styled.div`
  color: #fff;
  position: absolute;
  top: 10%;
  left: 70%;
  width: 100%;

  @media screen and (max-height: 850px) {
    display: none;
  }
`;

export const RouteOptionsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 40%;
  left: 1%;

  @media screen and (max-width: 828px) {
    left: 5%;
  }
`