import styled from "styled-components";

export const CustomizationSection = styled.div`
  height: 20px;
  color: white;
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  margin: 10px;
  flex-wrap: wrap;
`;

export const CustomizationButton = styled.p`
  font-weight: bold;
  padding: 5px;
  color: ${({ departureSetting }) => (departureSetting ? "aquamarine" : "")};
  border: ${({ departureSetting }) =>
    departureSetting ? "1px solid aquamarine" : ""};
  border-radius: ${({ departureSetting }) => (departureSetting ? "10px" : "")};
`;

export const CustomizationButton2 = styled.p`
  font-weight: bold;
  padding: 5px;
  color: ${({ departureSetting }) => (departureSetting ? "" : "aquamarine")};
  border: ${({ departureSetting }) =>
    departureSetting ? "" : "1px solid aquamarine"};
  border-radius: ${({ departureSetting }) => (departureSetting ? "" : "10px")};
`;

export const AlarmButton = styled.p`
  font-weight: bold;
  padding: 5px;
  color: ${({alarm}) => alarm ? "red" : ""};
  border:  ${({alarm}) => alarm ? "1px solid red" : ""};
  border-radius: ${({alarm}) => alarm ? "10px" : ""};
`;

export const GetBusStopButton = styled.p`
  font-weight: bold;
  padding: 5px;

  &:active {
    color: silver;
    border: 1px solid silver;
    border-radius: 10px;
  }
`;
